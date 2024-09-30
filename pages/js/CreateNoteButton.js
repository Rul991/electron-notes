import CustomHTMLElement from "./CustomHTMLElement.js"
import { $, createElement } from './documentWork.js'


export default class CreateNoteButton extends CustomHTMLElement {
    static get observedAttributes() {
        return ['editor']
    }

    getEditor() {
        this.noteEditor = $(this.editor)
        return this.noteEditor
    }

    createNewNote() {
        let note = createElement('note-element')

        return note
    }

    connectedCallback() {
        this.getEditor()

        this.addEventListener('click', e => {
            let note = this.createNewNote()
            this.openNoteEditor(note)
        })
    }

    openNoteEditor(note) {
        this.noteEditor.editNote(note)
    }
}