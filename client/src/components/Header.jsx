import { NavLink } from 'react-router-dom'

import { useStore } from '../store'

function Header() {
  const { state, setState } = useStore()

  const showModal = () => setState({
    ...state,
    showNoteForm: true
  })

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