import AddNoteForm from './AddNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'

const AddNote = () => {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data.entities[id])
    })
  })

  return users ? <AddNoteForm users={users} /> : <p>Loading...</p>
}

export default AddNote