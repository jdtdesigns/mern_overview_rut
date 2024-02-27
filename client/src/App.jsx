import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import NoteForm from './components/NoteForm'

import Home from './pages/Home'
import NotFound from './pages/NotFound'

import { useStore } from './store'


function App() {
  const { state } = useStore()

  return (
    <>
      <Header />

      {state.showNoteForm &&
        <NoteForm />}

      <Routes>
        <Route
          path="/"
          element={
            <Home />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
