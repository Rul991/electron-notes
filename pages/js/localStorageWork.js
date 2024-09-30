export const saveObjectInLocalStorage = (key = '', object = {}) => localStorage.setItem(key, JSON.stringify(object))
export const loadObjectInLocalStorage = (key = '') => {
    let item = localStorage.getItem(key)

    if(item instanceof Array)
        if(!item.length) item = '[]'
    return JSON.parse(item) ?? {}
}