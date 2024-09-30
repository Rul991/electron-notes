export const alignProperty = ({fromElement, toElement, property}) => {
    toElement.style[property] = getComputedStyle(fromElement).getPropertyValue(property)
}