import dayjs from 'dayjs'

import { useStore } from '../store'
import { useQuery, useMutation } from '@apollo/client'

import { GET_USER_NOTES } from '../graphql/queries'
import { DELETE_NOTE } from '../graphql/mutations'

function Dashboard() {
  const { state, setState } = useStore()
  const { data: noteData } = useQuery(GET_USER_NOTES)
  const [deleteNote] = useMutation(DELETE_NOTE, {
    refetchQueries: [GET_USER_NOTES]
  })

  const handleEditNote = (note) => {
    setState({
      ...state,
      editNote: note,
      showNoteForm: true
    })
  }

  const handleDeleteNote = async (note_id) => {
    // Show a confirmation dialog before deleting the note
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');

    if (confirmDelete) {
      try {
        await deleteNote({
          variables: {
            note_id: note_id
          }
        })
      } catch (err) {
        console.log(err)
      }
    }

    setState({
      ...state,
      editNote: null
    })
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <main className="notes-output">
        {!noteData?.getUserNotes.length && <h2>You have not created any notes.</h2>}

        {noteData?.getUserNotes.map((note, index) => (
          <div key={note._id} className="note">
            <h3>{note.text}</h3>
            <p>Created on {dayjs(note.createdAt).format('MM/DD/YYYY [at] hh:mm a')}</p>
            <div className="row">
              <button onClick={() => handleEditNote(note)} className="edit-btn">Edit Note</button>
              <button onClick={() => handleDeleteNote(note._id, index)} className="delete-btn">Delete Note</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Dashboard