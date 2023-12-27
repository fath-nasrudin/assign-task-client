import { useSelector } from 'react-redux'
import AddNoteForm from './AddNoteForm'
import { selectAllUsers } from '../users/usersApiSlice'

const AddNote = () => {
  const users = useSelector(selectAllUsers);
  return users ? <AddNoteForm users={users} /> : <p>Loading...</p>
}

export default AddNote