import TargetPage from './TargetPage'
import { render, screen, waitFor } from '@testing-library/react'
import * as ExtractQueryUtil from '../utils/ExtractQueryUtil'

describe('TargetPage', () => {
    it('renders props children', () => {
        render(<TargetPage target={`<div>hello world</div>`}></TargetPage>)

        expect(screen.getByText('hello world'))
    })

    it('call extractQueryFrom function of util', async () => {
        const spyExtractQueryFrom = jest.spyOn(ExtractQueryUtil, 'extractQueryFrom')

        render(<TargetPage />)

        await waitFor(() => {
            expect(spyExtractQueryFrom).toHaveBeenNthCalledWith(1, 'div')
            expect(spyExtractQueryFrom).toHaveBeenNthCalledWith(2, 'a')
        })
    })

    it('dispatch extracted queries', () => {
        render(<TargetPage />)
    })
})
