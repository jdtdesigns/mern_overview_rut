import dayjs from 'dayjs'

import { useQuery } from '@apollo/client'

import { GET_ALL_NOTES } from '../graphql/queries'

function Home() {
  const { data: noteData } = useQuery(GET_ALL_NOTES)

  return (
    <div>
      <h1>Welcome to the Note App</h1>

      <main className="notes-output">
        {!noteData?.getAllNotes.length && <h2>No notes have been added.</h2>}

        {noteData?.getAllNotes.map((note, index) => (
          <div key={note._id} className="note">
            <h3>{note.text}</h3>
            <p>Created by {note.user.username} on {dayjs(note.createdAt).format('MM/DD/YYYY [at] hh:mm a')}</p>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Home