import { useEffect } from 'react'
import { extractQueryFrom } from '../utils/ExtractQueryUtil'

const TargetPage = ({ target = `<></>` }) => {
    useEffect(() => {
        const element = document.querySelector('#target')
        element.innerHTML = target
        extractQueryFrom('div')
        extractQueryFrom('a')
    }, [])

    return <div id="target"></div>
}

export default TargetPage
