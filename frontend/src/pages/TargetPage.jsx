import { useEffect } from 'react'
import { extractQueryFrom } from '../utils/ExtractQueryUtil'
import { updateExtractedQuery } from '../store/extractedQuerySlice'
import { useDispatch } from 'react-redux'

const TargetPage = ({ target = `<></>` }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const element = document.querySelector('#target')
        element.innerHTML = target
        dispatch(
            updateExtractedQuery({
                queryFromDiv: extractQueryFrom('div'),
                queryFromA: extractQueryFrom('a'),
            })
        )
    }, [])

    return <div id="target"></div>
}

export default TargetPage
