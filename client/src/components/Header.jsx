import { NavLink } from 'react-router-dom'

function Header({ setShowNoteForm }) {
  const showModal = () => setShowNoteForm(true)

  return (
    <header className="row justify-between align-center">
      <h3>Note App</h3>

      <nav>
        <NavLink to="/">Home</NavLink>
        <button onClick={showModal} className="create-btn">Create Note</button>
      </nav>
    </header>
  )
}

export default Header