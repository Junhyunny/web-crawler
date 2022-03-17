import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

describe('App', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    it('renders url box', () => {
        render(<App />)

        expect(screen.getByPlaceholderText('put url what you want to crawl')).toBeInTheDocument()
    })

    it('fetches HTML document when type url into url box', () => {
        render(<App />)
        const spyAxios = jest.spyOn(axios, 'post')
        jest.useFakeTimers()
        userEvent.type(screen.getByPlaceholderText('put url what you want to crawl'), 'http://localhost:3000')

        jest.advanceTimersByTime(500)

        expect(spyAxios).toHaveBeenCalledTimes(1)
        expect(spyAxios).toHaveBeenCalledWith('/api/html-document', {
            url: 'http://localhost:3000',
        })
    })

    it('do not fetch HTML document with empty typed url box', () => {
        render(<App />)
        const spyAxios = jest.spyOn(axios, 'post')
        jest.useFakeTimers()
        jest.advanceTimersByTime(500)

        expect(spyAxios).toHaveBeenCalledTimes(0)
    })

    it('renders HTML document when fetches data', async () => {
        render(<App />)
        jest.spyOn(axios, 'post').mockResolvedValue({
            data: `<body>Hello world<div class="data">Data</div></body>`,
        })
        jest.useFakeTimers()
        userEvent.type(screen.getByPlaceholderText('put url what you want to crawl'), 'http://localhost:3000')

        jest.advanceTimersByTime(500)

        await waitFor(() => {
            expect(screen.getByText('Hello world')).toBeInTheDocument()
            expect(screen.getByText('Data')).toBeInTheDocument()
        })
    })

    it('renders "query" input box, "+" button and "-" button', () => {
        render(<App />)

        expect(screen.getByText('+')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('query')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('column')).toBeInTheDocument()
        expect(screen.getByText('-')).toBeInTheDocument()
    })

    it('click "+" button then increase "query" input box, "column" input box, "+" button and "-" button', () => {
        render(<App />)

        userEvent.click(screen.getByText('+'))

        expect(screen.getAllByPlaceholderText('query')).toHaveLength(2)
        expect(screen.getAllByPlaceholderText('column')).toHaveLength(2)
        expect(screen.getAllByText('-')).toHaveLength(2)
    })

    it('click "-" button then decrease "query" input boxes, "+" buttons and "-" buttons', () => {
        render(<App />)

        userEvent.click(screen.getByText('-'))

        expect(screen.queryAllByPlaceholderText('query')).toHaveLength(0)
        expect(screen.queryAllByPlaceholderText('column')).toHaveLength(0)
        expect(screen.queryAllByText('-')).toHaveLength(0)
    })

    it('renders typed text in query and column input box', async () => {
        render(<App />)
        const queryBox = screen.getByPlaceholderText('query')
        const columnBox = screen.getByPlaceholderText('column')

        userEvent.type(queryBox, 'text into query box')
        userEvent.type(columnBox, 'text into column box')

        await waitFor(() => {
            expect(queryBox).toHaveValue('text into query box')
            expect(columnBox).toHaveValue('text into column box')
        })
    })

    it('renders expected value when typed query', async () => {
        render(<App />)

        jest.spyOn(axios, 'post').mockResolvedValue({
            data: `<body>Hello world<div class="data">First</div><div class="data">Second</div></body>`,
        })
        jest.useFakeTimers()
        userEvent.type(screen.getByPlaceholderText('put url what you want to crawl'), 'http://localhost:3000')
        jest.advanceTimersByTime(500)

        await waitFor(() => {
            console.log('---------------------- wait for -----------------------')
            userEvent.type(screen.getByPlaceholderText('query'), '.data')
        })

        // userEvent.type(await screen.findByPlaceholderText('query'), '.data')

        await waitFor(() => {
            expect(screen.getByText('[First, Second]')).toBeInTheDocument()
        })
    })
})
