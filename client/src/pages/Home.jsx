import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

function Home({
  setShowNoteForm,
  setEditNote,
  notes,
  setNotes }) {

  useEffect(() => {
    axios.get('/api/notes')
      .then((res) => {
        setNotes(res.data)
      })
  }, [])

  const handleEditNote = (note) => {
    setEditNote(note)
    setShowNoteForm(true)
  }

  const deleteNote = async (note_id, index) => {
    // Show a confirmation dialog before deleting the note
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');

    if (confirmDelete) {
      // If user confirms, proceed with deletion
      await axios.delete('/api/note/' + note_id);
      notes.splice(index, 1);
      setNotes([...notes]);
    } else {
      // If user cancels, do nothing
      console.log('Deletion canceled by user');
    }

    setEditNote(null)
  }

  return (
    <div>
      <h1>Welcome to the Note App</h1>

      <main className="notes-output">
        {!notes.length && <h2>No notes have been added.</h2>}

        {notes.map((note, index) => (
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