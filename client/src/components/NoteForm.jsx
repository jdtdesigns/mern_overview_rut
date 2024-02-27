import axios from 'axios'
import { useState, useEffect } from 'react'

function NoteForm({
  editNote,
  setEditNote,
  setShowNoteForm,
  setNotes }) {
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    if (editNote) {
      setNoteText(editNote.text)
    }
  }, [])

  const createOrEditNote = async (e) => {
    e.preventDefault()

    if (!editNote) {
      const res = await axios.post('/api/notes', {
        text: noteText
      })

      setNotes((oldState) => {
        return [...oldState, res.data]
      })
    } else {
      await axios.put('/api/note', {
        note_id: editNote._id,
        text: noteText
      })

      setNotes((oldState) => {
        editNote.text = noteText

        return [...oldState]
      })
    }

    setShowNoteForm(false)
    setEditNote(null)
  }

  const closeModal = () => {
    setEditNote(null)
    setShowNoteForm(false)
  }

  const handleInputChange = (e) => {
    setNoteText(e.target.value)
  }

  return (
    <div className="note-form">
      <h1 className="text-center">{editNote ? 'Edit' : 'Create'} Note</h1>

      <form onSubmit={createOrEditNote} className="column">
        <input
          value={noteText}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter the note text" />
        <button>{editNote ? 'Save' : 'Create'}</button>
        <button onClick={closeModal} className="cancel-btn">Cancel</button>
      </form>
    </div>
  )
}

export default NoteForm