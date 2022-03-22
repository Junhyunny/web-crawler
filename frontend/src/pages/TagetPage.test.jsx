import TargetPage from './TargetPage'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('TargetPage', () => {
    it('renders props children', () => {
        render(<TargetPage target={`<div>hello world</div>`}></TargetPage>)

        expect(screen.getByText('hello world'))
    })

    it('set queries when click child component', () => {
        const setExtractedQuery = jest.fn()
        const target = `
            <div class='parent'>
                <div class='parent__child hello'>hello world</div>
            </div>
        `

        render(<TargetPage target={target}></TargetPage>)

        let query = ''
        const elements = document.querySelectorAll('div')
        elements.forEach((element) =>
            element.addEventListener(
                'click',
                (event) => {
                    if (query !== '') {
                        query += ' '
                    }
                    query += event.currentTarget.tagName
                    let classes = event.currentTarget.classList
                    for (let index = 0; index < classes.length; index++) {
                        query += `.${classes[index]}`
                    }
                    setExtractedQuery(query)
                },
                { capture: true }
            )
        )

        userEvent.click(screen.getByText('hello world'))

        expect(setExtractedQuery).toHaveBeenCalledTimes(4)
        expect(setExtractedQuery).toHaveBeenNthCalledWith(1, 'DIV')
        expect(setExtractedQuery).toHaveBeenNthCalledWith(2, 'DIV DIV')
        expect(setExtractedQuery).toHaveBeenNthCalledWith(3, 'DIV DIV DIV.parent')
        expect(setExtractedQuery).toHaveBeenNthCalledWith(4, 'DIV DIV DIV.parent DIV.parent__child.hello')
    })
})
