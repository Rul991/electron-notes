import { readJSONFromFile } from "./filework.js"

export const animateByJSON = (element, src) => {
    readJSONFromFile(src, data => {
        if(data.typeEvent)
        element.addEventListener()
    })
}

export const animateFromTo = ({element, time = 200, styleProperty, from, to}) => {
    const keyframes = [
        {}, {}
    ]
    if(from) keyframes[0][styleProperty] = from
    else keyframes[0][styleProperty] = getComputedStyle(element).getPropertyValue(styleProperty)
    keyframes[1][styleProperty] = to

    element.animate(keyframes, {duration: time})
}

export const downToTopAnimate = (element, time = 200) => animateFromTo({element, time, from: '100%', to: '0%', styleProperty: 'marginTop'})

export const topToDownAnimate = (element, time = 200) => animateFromTo({element, time, from: '0%', to: '100%', styleProperty: 'marginTop'})

export const leftToRightAnimate = (element, time = 200) => animateFromTo({element, time, from: '0%', to: '100%', styleProperty: 'marginLeft'})

export const rightToLeftAnimate = (element, time = 200) => animateFromTo({element, time, from: '100%', to: '0%', styleProperty: 'marginLeft'})