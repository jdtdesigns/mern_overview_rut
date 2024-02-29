import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_NOTE, EDIT_NOTE } from '../graphql/mutations'
import { GET_ALL_NOTES, GET_USER_NOTES } from '../graphql/queries'

import { useStore } from '../store'

function NoteForm() {
  const { state, setState } = useStore()
  const [noteText, setNoteText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [createNote] = useMutation(CREATE_NOTE, {
    variables: {
      text: noteText
    },
    refetchQueries: [GET_ALL_NOTES, GET_USER_NOTES]
  })
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      text: noteText,
      note_id: state.editNote?._id
    },
    refetchQueries: [GET_USER_NOTES]
  })

  useEffect(() => {
    if (state.editNote) {
      setNoteText(state.editNote.text)
    }
  }, [])

  const createOrEditNote = async (e) => {
    e.preventDefault()

    if (!state.editNote) {
      try {
        await createNote()

        setState({
          ...state,
          showNoteForm: false
        })

        setErrorMessage('')
      } catch (err) {
        setErrorMessage(err.message)
      }
    } else {
      try {
        await editNote()

        setState({
          ...state,
          showNoteForm: false,
          editNote: null
        })

        setErrorMessage('')
      } catch (err) {
        setErrorMessage(err.message)
      }
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
        {errorMessage && <p className="error text-center">{errorMessage}</p>}
        <input
          value={noteText}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter the note text"
          autoFocus />
        <button>{state.editNote ? 'Save' : 'Create'}</button>
        <button onClick={closeModal} className="cancel-btn">Cancel</button>
      </form>
    </div>
  )
}

export default NoteForm