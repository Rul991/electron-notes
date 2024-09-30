import CreateNoteButton from "./CreateNoteButton.js"
import NoteContainer from "./NoteContainer.js"
import NoteEditor from "./NoteEditor.js"
import NoteElement from "./NoteElement.js"

const customElementsDefine = (elements = {}) => {
    Object.entries(elements).forEach(([key, value]) => {
        customElements.define(key, value)
    })
}

customElementsDefine({
    'note-element': NoteElement,
    'note-container': NoteContainer,
    'note-editor': NoteEditor,
    'create-note': CreateNoteButton
})