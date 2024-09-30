import { alignProperty } from "./cssWork.js"
import { $ } from "./documentWork.js"

alignProperty({
    fromElement: $('nav'),
    toElement: $('.nav-relative'),
    property: 'height'
})