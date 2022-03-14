import {render, screen, waitFor} from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

describe('App', () => {
    it('renders url input box', () => {
        render(<App/>)

        expect(screen.getByPlaceholderText('put url what you want to crawl')).toBeInTheDocument()
    })

    it('fetches HTML document when type url into input box', () => {
        jest.useFakeTimers()

        render(<App/>)
        const spyAxios = jest.spyOn(axios, 'post')
        const urlBox = screen.getByPlaceholderText('put url what you want to crawl')

        userEvent.type(urlBox, 'http://localhost:3000')
        jest.advanceTimersByTime(500)

        expect(spyAxios).toHaveBeenCalledTimes(1)
        expect(spyAxios).toHaveBeenCalledWith('/api/html-document', {
            url: 'http://localhost:3000',
        })
    })

    it('renders HTML document when fetches data', async () => {
        jest.useFakeTimers()

        render(<App/>)
        jest.spyOn(axios, 'post').mockResolvedValue({
            data: `<body>Hello world<div class="data">Data</div></body>`
        })

        const urlBox = screen.getByPlaceholderText('put url what you want to crawl')

        userEvent.type(urlBox, 'http://localhost:3000')
        jest.advanceTimersByTime(500)

        await waitFor(() => {
            expect(screen.getByText('Hello world')).toBeInTheDocument()
            expect(screen.getByText('Data')).toBeInTheDocument()
        })
    })
})
