import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import NoteForm from './components/NoteForm'
import Protect from './components/Protect'
import Loading from './components/Loading'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import AuthForm from './pages/AuthForm'
import Dashboard from './pages/Dashboard'

import { useStore } from './store'


function App() {
  const { state } = useStore()

  return (
    <>
      <Header />

      {state.loading && <Loading />}

      {state.showNoteForm &&
        <NoteForm />}

      <Routes>
        <Route
          path="/"
          element={
            <Home />} />

        <Route path="/auth" element={(
          <Protect>
            <AuthForm />
          </Protect>
        )} />
        <Route path="/dashboard" element={(
          <Protect>
            <Dashboard />
          </Protect>
        )} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
