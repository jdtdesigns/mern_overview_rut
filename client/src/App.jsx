import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'

import Home from './pages/Home'
import NoteForm from './components/NoteForm'


function App() {
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [notes, setNotes] = useState([])
  const [editNote, setEditNote] = useState(null)

  return (
    <>
      <Header setShowNoteForm={setShowNoteForm} />

      {showNoteForm &&
        <NoteForm
          editNote={editNote}
          setEditNote={setEditNote}
          setShowNoteForm={setShowNoteForm}
          setNotes={setNotes} />}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              setEditNote={setEditNote}
              setShowNoteForm={setShowNoteForm}
              notes={notes}
              setNotes={setNotes} />} />
      </Routes>
    </>
  )
}

export default App
