import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { notesApiSlice } from '../notes/notesApiSlice'

const Prefetch = () => {

  useEffect(() => {
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'notestList', { force: true }))
    store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
  }, [])

  return <Outlet />
}

export default Prefetch