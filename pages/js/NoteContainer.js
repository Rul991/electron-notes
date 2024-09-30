import { leftToRightAnimate, rightToLeftAnimate } from "./animations.js"
import CustomHTMLElement from "./CustomHTMLElement.js"
import { all$, createElement } from "./documentWork.js"
import { loadObjectInLocalStorage, saveObjectInLocalStorage } from "./localStorageWork.js"
import NoteElement from "./NoteElement.js"

export default class NoteContainer extends CustomHTMLElement {
    appendChild(node) {
        super.appendChild(node)
        this.pushNoteArray(node)
        this.updateContainer()
        node.addEventListener('note-remove', e => this.removeNote(node))
    }

    removeNote(note) {
        if(!this.notes) return
        if(!this.notes.size) return

        this.notes.delete(note)
        this.updateContainer()
    }

    updateContainer() {
        this.saveInLocalStorage()
        this.toggleEmptyElement()
    }

    createNoteArray() {
        if(!this.notes) this.notes = new Set()
    }

    pushNoteArray(...items) {
        this.createNoteArray()
        items.forEach(item => {
            if(item instanceof NoteElement)
                this.notes.add(item)
        })
    }

    saveInLocalStorage() {
        let saveNotes = []
        this.notes.forEach(note => {
            if(!note.isDeleted) {
                let {header, body, editor} = note
                saveNotes.push({header, body, editor})
            }
        })

        saveObjectInLocalStorage(`notes-${this.id}`, saveNotes)
    }

    loadFromLocalStorage() {
        let saveNotes = loadObjectInLocalStorage(`notes-${this.id}`)

        if(!saveNotes instanceof Array) return
        if(!saveNotes.length) return

        saveNotes.forEach(note => {
            let noteElement = createElement('note-element')
            for (const key in note) {
                noteElement.setAttribute(key, note[key])
            }
            
            this.appendChild(noteElement)
        })
    }

    toggleEmptyElement() {
        if(!all$('note-element', this).length) this.showEmptyElement()
        else this.removeEmptyElement()
    }

    showEmptyElement() {
        if(!this.emptyElement) this.createEmptyElement()
        this.emptyElement.style.display = 'block'
        rightToLeftAnimate(this.emptyElement)
    }

    createEmptyElement() {
        this.emptyElement = document.createElement('empty')
        this.emptyElement.classList.add('empty-note-element')
        this.emptyElement.textContent = 'There is no notes. Click "+" to create first note!'

        this.append(this.emptyElement)
    }

    removeEmptyElement() {
        if(!this.emptyElement) return
        this.emptyElement.style.display = 'none'
    }

    connectedCallback() {
        this.loadFromLocalStorage()
        this.toggleEmptyElement()
    }
}