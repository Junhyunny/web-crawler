import {useEffect} from "react";

const TargetPage = ({target}) => {

    useEffect(() => {
        const element = document.querySelector('#target')
        element.innerHTML = target
    }, [])

    return <div id="target"></div>
}

export default TargetPage
