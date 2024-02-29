import { useEffect } from 'react';
import { useStore } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';

function Protect({ children }) {
  const { state } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (state.user && location.pathname === '/auth') return navigate('/dashboard')

    if (!state.user && !location.pathname.includes('auth')) return navigate('/auth')
  }, [state.user])

  return (
    <>
      {children}
    </>
  )
}

export default Protect