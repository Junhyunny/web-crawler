import { useEffect } from 'react'
import { addExtractQueryEventFrom, extractQuery } from '../utils/ExtractQueryUtil'
import { updateExtractedQuery } from '../store/extractedQuerySlice'
import { useDispatch } from 'react-redux'

const TargetPage = ({ target = `<></>` }) => {
    const dispatch = useDispatch()

    const extractQueryHandler = () => {
        const extractedQuery = extractQuery()
        dispatch(updateExtractedQuery(extractedQuery))
    }

    useEffect(() => {
        const element = document.querySelector('#target')
        element.innerHTML = target
        addExtractQueryEventFrom('target', 'div', ['target'])
        addExtractQueryEventFrom('target', 'a', ['target'])
    }, [])

    return <div id="target" onClick={extractQueryHandler}></div>
}

export default TargetPage
