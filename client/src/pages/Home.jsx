import { useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { useStore } from '../store'

function Home() {
  const { state, setState } = useStore()

  useEffect(() => {
    axios.get('/api/notes')
      .then((res) => {
        setState({
          ...state,
          notes: res.data
        })
      })
  }, [])

  const handleEditNote = (note) => {
    setState({
      ...state,
      editNote: note,
      showNoteForm: true
    })
  }

  const deleteNote = async (note_id, index) => {
    // Show a confirmation dialog before deleting the note
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');

    if (confirmDelete) {
      // If user confirms, proceed with deletion
      await axios.delete('/api/note/' + note_id);
      state.notes.splice(index, 1);
      setState({
        ...state,
        notes: [...state.notes]
      })
    } else {
      // If user cancels, do nothing
      console.log('Deletion canceled by user');
    }

    setState({
      ...state,
      editNote: null
    })
  }

  return (
    <div>
      <h1>Welcome to the Note App</h1>

      <main className="notes-output">
        {!state.notes.length && <h2>No notes have been added.</h2>}

        {state.notes.map((note, index) => (
          <div key={note._id} className="note">
            <h3>{note.text}</h3>
            <p>Created On: {dayjs(note.createdAt).format('MM/DD/YYYY hh:mm a')}</p>
            <div className="row">
              <button onClick={() => handleEditNote(note)} className="edit-btn">Edit Note</button>
              <button onClick={() => deleteNote(note._id, index)} className="delete-btn">Delete Note</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Home