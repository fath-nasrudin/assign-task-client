import { useParams } from "react-router-dom"
import EditNoteForm from "./EditNoteForm"
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'

const EditNote = () => {
  const { id } = useParams();

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(userId => data.entities[userId])
    })
  })

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id]
    })
  })


  return (users && note) ? <EditNoteForm users={users} note={note} /> : <p>Loading...</p>
}

export default EditNote