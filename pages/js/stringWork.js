import { createElement } from "./documentWork.js"

export const truncateString = (string, separator, count) => {
    let newString = ''
    let splittedString = string.split(separator)
    
    let iterations = 0
    for (const stringPart of splittedString) {
        if(iterations >= count) break
        newString += stringPart + separator

        iterations++
    }

    return newString
}

export const shortenString = (string, length) => {
    if(string.length > length) return string.substring(0, length) + '...'
    return string
}

export const getStringWidth = ({element = document.body, string = ''}) => {
    const canvas = createElement('canvas')
    const ctx = canvas.getContext('2d')

    ctx.font = getComputedStyle(element).getPropertyValue('font')
    let { width } = ctx.measureText(string)

    return width
}

export const getMaxSymbolsCountInString = ({element, width}) => {
    let symbolsCount = 0
    let supposedWidth = getStringWidth({element, string: '@'.repeat(symbolsCount)})

    while(width > supposedWidth) {
        symbolsCount++
        supposedWidth = getStringWidth({element, string: '@'.repeat(symbolsCount)})
    }

    return symbolsCount
}