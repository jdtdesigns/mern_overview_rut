import axios from 'axios'
import { useState, useEffect } from 'react'

import { useStore } from '../store'

function NoteForm() {
  const { state, setState } = useStore()
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    if (state.editNote) {
      setNoteText(state.editNote.text)
    }
  }, [])

  const createOrEditNote = async (e) => {
    e.preventDefault()

    if (!state.editNote) {
      const res = await axios.post('/api/notes', {
        text: noteText
      })

      setState({
        ...state,
        showNoteForm: false,
        notes: [...state.notes, res.data]
      })
    } else {
      await axios.put('/api/note', {
        note_id: state.editNote._id,
        text: noteText
      })

      state.editNote.text = noteText

      setState({
        ...state,
        notes: [...state.notes],
        showNoteForm: false,
        editNote: null
      })
    }
  }

  const closeModal = () => {
    setState({
      ...state,
      showNoteForm: false,
      editNote: null
    })
  }

  const handleInputChange = (e) => {
    setNoteText(e.target.value)
  }

  return (
    <div className="note-form">
      <h1 className="text-center">{state.editNote ? 'Edit' : 'Create'} Note</h1>

      <form onSubmit={createOrEditNote} className="column">
        <input
          value={noteText}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter the note text" />
        <button>{state.editNote ? 'Save' : 'Create'}</button>
        <button onClick={closeModal} className="cancel-btn">Cancel</button>
      </form>
    </div>
  )
}

export default NoteForm