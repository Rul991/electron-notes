import { downToTopAnimate, topToDownAnimate } from "./animations.js"
import CustomHTMLElement from "./CustomHTMLElement.js"
import { $ } from "./documentWork.js"

export default class NoteEditor extends CustomHTMLElement {
    static get observedAttributes() {
        return ['container']
    }

    constructor() {
        super()
        this.style.display = 'none'
    }

    getContainer() {
        this.containerElement = $(this.container)
        return this.containerElement
    }

    createButton() {
        this.button = $('button', this)
        this.button.note = {}
        this.button.addEventListener('click', e => this.saveNote(this.button.note))
    }

    createHTML() {
        this.innerHTML = `
            <div>
                <input placeholder="Название">
            </div>

            <textarea placeholder="Описание"></textarea>
            <button tabindex="0">✔</button>
        `
    }

    createNoteEditor() {
        this.createHTML()

        this.input = $('input', this)
        this.textarea = $('textarea', this)
        this.createButton()
    }

    show() {
        this.style.display = 'block'
        downToTopAnimate(this)
    }

    hide() {
        topToDownAnimate(this)
        setTimeout(() => {
            this.style.display = 'none'
        }, 200)
    }

    editNote(note) {
        this.button.note = note
        this.show()
        this.input.value = note.header ?? ''
        this.textarea.value = note.body ?? ''
    }

    createNote(note) {
        note.setAttribute('header', this.input.value)
        note.setAttribute('body', this.textarea.value)
        note.setAttribute('editor', `#${this.id}`)
        this.getContainer().appendChild(note)
    }

    isInputsHaveText() {
        if (this.textarea.value.length || this.input.value.length) return true
        return false
    }

    saveNote(note) {
        if(this.isInputsHaveText()) {
            this.createNote(note)
            this.button.note = {}
        }

        this.hide()
    }

    changeTextButton(text, condition = true) {
        if(condition) this.button.textContent = text
    }

    changeTextButtonOnCross() {
        this.changeTextButton('✖', !this.isInputsHaveText())
    }

    changeTextButtonOnCheckmark() {  
        this.changeTextButton('✔')
    }

    connectedCallback() {
        this.createNoteEditor()
        this.button.addEventListener('mouseover', e => this.changeTextButtonOnCross())
        this.button.addEventListener('mouseout', e => this.changeTextButtonOnCheckmark())
    }

    disconnectedCallback() {
        this.button.removeEventListener('mouseover', e => this.changeTextButtonOnCross())
        this.button.removeEventListener('mouseout', e => this.changeTextButtonOnCheckmark())
    }
}