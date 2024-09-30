import { leftToRightAnimate } from "./animations.js"
import CustomHTMLElement from "./CustomHTMLElement.js"
import { $ } from "./documentWork.js"
import { getMaxSymbolsCountInString, shortenString, truncateString } from "./stringWork.js"

export default class NoteElement extends CustomHTMLElement {
    static get observedAttributes() {
        return ['header', 'body', 'editor']
    }

    getEditor() {
        this.noteEditor = $(this.editor)
        return this.noteEditor
    }

    createHTML() {
        this.innerHTML = `
            <div class="grid-auto-10">
                <div class="header">${this.createShortenHeader()}</div>
                <button class="trash-can red-background"><img class="inverted-image" src="images/trash-can.png"></button>
            </div>
            <div class="body">${this.createShortenBody()}</div>
        `
    }

    createShortenHeader() {
        return shortenString(this.header, getMaxSymbolsCountInString({element: this, width: window.innerWidth / 3.3}))
    }

    createShortenBody() {
        return shortenString(this.body, 50)
    }

    editNoteElement() {
        this.getHeaderAndBody()
        this.createHTML()

        this.button = $('button', this)
    }

    getHeaderAndBody() {
        this.header = this.header ?? ''
        this.body = this.body ?? ''
    }

    isClickedOnElement(event, element) {
        if(event.target == element) return true
        for (const child of element.children) if(event.target == child) return true

        return false
    }

    connectedCallback() {
        this.editNoteElement()

        this.addEventListener('click', e => {
            if(this.isClickedOnElement(e, this.button)) {
                this.remove()
            }
            else this.getEditor().editNote(this)
        })


    }

    setAttribute(key, value) {
        super.setAttribute(key, value)
        this.editNoteElement()
    }

    remove() {
        let time = 300

        leftToRightAnimate(this, time)

        setTimeout(() => {
            super.remove()
            this.dispatchEvent(new Event('note-remove'))
        }, time)
    }
}