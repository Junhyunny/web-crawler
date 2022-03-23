import { render, screen } from '@testing-library/react'
import { addExtractQueryEventFrom, extractQuery, removeExtractQueryEventFrom } from './ExtractQueryUtil'
import userEvent from '@testing-library/user-event'

describe('ExtractQueryUtil', () => {
    it('extract query string from child div', () => {
        render(
            <div id="target">
                <div className={'hello'}>hello</div>
                <div className={'world'}>world</div>
                <div className={'parent'}>
                    <div className={'child'}>child</div>
                </div>
            </div>
        )
        addExtractQueryEventFrom('target', 'div', ['target'])

        userEvent.click(screen.getByText('child'))

        expect(extractQuery()).toEqual('DIV.parent DIV.child')
        expect(extractQuery()).toEqual('')
    })

    it('could not extract query string from child div after remove event handler', () => {
        render(
            <div id="target">
                <div className={'hello'}>hello</div>
                <div className={'world'}>world</div>
                <div className={'parent'}>
                    <div className={'child'}>child</div>
                </div>
            </div>
        )
        addExtractQueryEventFrom('target', 'div', ['target'])
        removeExtractQueryEventFrom('target', 'div', ['target'])

        userEvent.click(screen.getByText('child'))

        expect(extractQuery()).toEqual('')
    })
})
