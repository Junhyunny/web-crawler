import TargetPage from './TargetPage'
import { queryByAttribute, render, screen, waitFor } from '@testing-library/react'

import * as ExtractQueryUtil from '../utils/ExtractQueryUtil'
import * as ExtractedQueryStore from '../store/extractedQuerySlice'

import { Provider } from 'react-redux'
import { store } from '../store'
import userEvent from '@testing-library/user-event'

describe('TargetPage', () => {
    const renderWithProvider = (target = `<></>`) => {
        return render(
            <Provider store={store}>
                <TargetPage target={target} />
            </Provider>
        )
    }

    it('renders props children', () => {
        renderWithProvider(`<div>hello world</div>`)

        expect(screen.getByText('hello world'))
    })

    it('call extractQueryFrom function of util', async () => {
        const spyExtractQueryEventFrom = jest.spyOn(ExtractQueryUtil, 'addExtractQueryEventFrom')

        renderWithProvider(<TargetPage />)

        await waitFor(() => {
            expect(spyExtractQueryEventFrom).toHaveBeenNthCalledWith(1, 'target', 'div', ['target'])
        })
        expect(spyExtractQueryEventFrom).toHaveBeenNthCalledWith(2, 'target', 'a', ['target'])
    })

    it('dispatch extracted queries', async () => {
        jest.spyOn(ExtractQueryUtil, 'extractQuery').mockReturnValueOnce('DIV.hello')
        const spyUpdateExtractedQuery = jest.spyOn(ExtractedQueryStore, 'updateExtractedQuery')
        const getById = queryByAttribute.bind(null, 'id')
        const dom = renderWithProvider(`<div class="hello"><a class="world">hello world</a></div>`)

        userEvent.click(getById(dom.container, 'target'))

        await waitFor(() => {
            expect(spyUpdateExtractedQuery).toHaveBeenCalledTimes(1)
        })
        expect(spyUpdateExtractedQuery).toHaveBeenCalledWith('DIV.hello')
    })
})
