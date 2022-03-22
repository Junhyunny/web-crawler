import axios from 'axios'
import { useCallback, useState } from 'react'

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
    const [queryBoxes, setQueryBoxes] = useState([{ query: '', column: '' }])
    const [expectedValues, setExpectedValues] = useState([])

    const urlChangeHandler = debounce(({ target }) => {
        const requestBody = {
            url: target.value,
        }
        axios.post('/api/html-document', requestBody).then(({ data }) => {
            const responseBody = document.querySelector('#responseBody')
            responseBody.innerHTML = data
        })
    })

    const increaseHandler = () => {
        setQueryBoxes([...queryBoxes, { query: '', column: '' }])
    }

    const decreaseHandler = (index) => {
        queryBoxes.splice(index, 1)
        setQueryBoxes([...queryBoxes])
    }

    const mapToInnerHTMLList = (nodeList) => {
        const array = []
        for (let index = 0; index < nodeList.length; index++) {
            array.push(nodeList[index].innerHTML)
        }
        return array
    }

    const debouncedSelector = useCallback(
        debounce((query) => {
            if (!query) {
                return
            }
            const nodeList = document.querySelector('#responseBody').querySelectorAll(query)
            setExpectedValues([...expectedValues, mapToInnerHTMLList(nodeList)])
        }),
        []
    )

    const queryHandler = (index, { target }) => {
        const array = [...queryBoxes]
        array[index] = { ...array[index], query: target.value }
        setQueryBoxes(array)
        debouncedSelector(target.value)
    }

    const columnHandler = (index, { target }) => {
        queryBoxes[index].column = target.value
        setQueryBoxes([...queryBoxes])
    }

    const printArray = (array) => {
        if (!array) {
            return
        }
        return '[' + array.join(', ') + ']'
    }

    return (
        <div>
            <div id="responseBody" style={{ width: 0, height: 0, overflow: 'hidden' }}></div>
            <input type="text" placeholder="put url what you want to crawl" onChange={urlChangeHandler} />
            <a onClick={increaseHandler}>+</a>
            {queryBoxes.map((queryBox, index) => {
                return (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="query"
                            value={queryBox.query}
                            onChange={(event) => queryHandler(index, event)}
                        />
                        <input
                            type="text"
                            placeholder="column"
                            value={queryBox.column}
                            onChange={(event) => columnHandler(index, event)}
                        />
                        <a onClick={() => decreaseHandler(index)}>-</a>
                        <div>{printArray(expectedValues[index])}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default App
