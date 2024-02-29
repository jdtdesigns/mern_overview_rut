import { NavLink, useNavigate } from 'react-router-dom'
import './header.css'

import { useStore } from '../../store'
import { useMutation } from '@apollo/client'
import { LOGOUT_USER } from '../../graphql/mutations'

function Header() {
  const navigate = useNavigate()
  const { state, setState } = useStore()
  const [logoutUser] = useMutation(LOGOUT_USER, {
    update(cache) {
      cache.evict({ fieldName: 'getUserNotes' })
    }
  })

  const showModal = () => setState({
    ...state,
    showNoteForm: true
  })

  const handleLogoutUser = async () => {
    await logoutUser()

    setState({
      ...state,
      user: null
    })

    navigate('/')
  }

  return (
    <header className="row justify-between align-center">
      <h3>Note App</h3>

      <nav className="row align-center">
        {state.user ? (
          <>
            <p>Welcome, {state.user.username}</p>
            <NavLink to="/">Home</NavLink>
            <NavLink className="nav-btn" to="/dashboard">Dashboard</NavLink>

            <button onClick={showModal} className="nav-btn create">Create Note</button>
            <button className="nav-btn" onClick={handleLogoutUser}>Log Out</button>
          </>
        ) : (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/auth">Login | Register</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header