let query = ''

const innerExtractQueryEvent = ({ currentTarget }) => {
    if (query !== '') {
        query += ' '
    }
    query += currentTarget.tagName
    const classList = currentTarget.classList
    for (let index = 0; index < classList.length; index++) {
        query += '.' + classList[index]
    }
}

export const addExtractQueryEventFrom = (targetId, tagName = 'div', exceptedIds = []) => {
    const elements = document.getElementById(targetId).querySelectorAll(tagName)
    Array.prototype.filter
        .call(elements, (element) => !exceptedIds.includes(element.id))
        .forEach((element) => {
            element.addEventListener('click', innerExtractQueryEvent, true)
        })
}

export const removeExtractQueryEventFrom = (targetId, tagName = 'div', exceptedIds = []) => {
    const elements = document.getElementById(targetId).querySelectorAll(tagName)
    Array.prototype.filter
        .call(elements, (element) => !exceptedIds.includes(element.id))
        .forEach((element) => {
            element.removeEventListener('click', innerExtractQueryEvent, true)
        })
}

export const extractQuery = () => {
    const temp = query
    query = ''
    return temp
}
