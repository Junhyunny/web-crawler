import axios from 'axios'
import { useState } from 'react'

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
    const increaseHandler = () => {
        setQueryBoxes([...queryBoxes, { query: '' }])
    }

    const decreaseHandler = (index) => {
        queryBoxes.splice(index, 1)
        setQueryBoxes([...queryBoxes])
    }

    const [queryBoxes, setQueryBoxes] = useState([{ query: '' }])

    const urlChangeHandler = debounce(({ target }) => {
        const requestBody = {
            url: target.value,
        }
        axios.post('/api/html-document', requestBody).then(({ data }) => {
            const element = document.createElement('html')
            const responseBody = document.querySelector('#responseBody')
            element.innerHTML = data
            responseBody.innerHTML = element.querySelector('body').innerHTML
        })
    })

    return (
        <div>
            <div id="responseBody" style={{ width: 0, height: 0, overflow: 'hidden' }}></div>
            <input type="text" placeholder="put url what you want to crawl" onChange={urlChangeHandler} />
            <a onClick={increaseHandler}>+</a>
            {queryBoxes.map((queryBox, index) => {
                return (
                    <div key={index}>
                        <input type="text" placeholder="query" defaultValue={queryBox.query} />
                        <a onClick={() => decreaseHandler(index)}>-</a>
                    </div>
                )
            })}
        </div>
    )
}

export default App
