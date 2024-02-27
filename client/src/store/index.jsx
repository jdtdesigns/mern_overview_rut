import { useContext, createContext, useState } from 'react'

const Context = createContext()

export function Provider({ children }) {
  const [state, setState] = useState({
    showNoteForm: false,
    notes: [],
    editNote: null
  })

  return (
    <Context.Provider value={{
      state,
      setState
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStore = () => useContext(Context)
