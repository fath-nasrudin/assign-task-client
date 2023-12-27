import { useSelector } from 'react-redux'
import AddNoteForm from './AddNoteForm'
import { SelectAllUsers } from '../users/usersApiSlice'

const AddNote = () => {
  const users = useSelector(SelectAllUsers);
  return users ? <AddNoteForm users={users} /> : <p>Loading...</p>
}

export default AddNote