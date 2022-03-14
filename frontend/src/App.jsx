import axios from 'axios'

const debounce = (fn, timeout = 500) => {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        const context = this
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, timeout)
    }
}

function App() {

    const urlChangeHandler = debounce(({target}) => {
        const requestBody = {
            url: target.value,
        }
        axios.post('/api/html-document', requestBody)
            .then(({data}) => {
                const element = document.createElement('html')
                element.innerHTML = data
                const responseBody = document.querySelector('#responseBody')
                responseBody.innerHTML = element.querySelector('body').innerHTML
            })
    })

    return (
        <div>
            <input placeholder="put url what you want to crawl" onChange={urlChangeHandler}/>
            <div id="responseBody" style={{width: 0, height: 0, overflow: 'hidden'}}></div>
        </div>
    )
}

export default App
