import TargetPage from './TargetPage'
import { render, screen, waitFor } from '@testing-library/react'

import * as ExtractQueryUtil from '../utils/ExtractQueryUtil'
import * as ExtractedQueryStore from '../store/extractedQuerySlice'

import { Provider } from 'react-redux'
import { store } from '../store'

describe('TargetPage', () => {
    const renderWithProvider = (target = `<></>`) => {
        render(
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
        const spyExtractQueryFrom = jest.spyOn(ExtractQueryUtil, 'extractQueryFrom')

        renderWithProvider(<TargetPage />)

        await waitFor(() => {
            expect(spyExtractQueryFrom).toHaveBeenNthCalledWith(1, 'div')
        })
        expect(spyExtractQueryFrom).toHaveBeenNthCalledWith(2, 'a')
    })

    it('dispatch extracted queries', async () => {
        jest.spyOn(ExtractQueryUtil, 'extractQueryFrom').mockReturnValueOnce('DIV.hello')
        jest.spyOn(ExtractQueryUtil, 'extractQueryFrom').mockReturnValueOnce('A.world')
        const spyUpdateExtractedQuery = jest.spyOn(ExtractedQueryStore, 'updateExtractedQuery')

        renderWithProvider(`<div class="hello"><a class="world">hello world</a></div>`)

        await waitFor(() => {
            expect(spyUpdateExtractedQuery).toHaveBeenCalledTimes(1)
        })
        expect(spyUpdateExtractedQuery).toHaveBeenCalledWith({
            queryFromDiv: 'DIV.hello',
            queryFromA: 'A.world',
        })
    })
})
