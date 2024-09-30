export default class CustomHTMLElement extends HTMLElement {
    constructor() {
        super()
    }
    
    static get observedAttributes() {
        return ['']
    }
    
    connectedCallback() {
        
    }
    
    disconnectedCallback() {
      
    }

    setAttribute(name, value) {
        super.setAttribute(name, value)
        this[name] = value
    }
    
    attributeChangedCallback(key, old, value) {
        this[key] = value
    }
}