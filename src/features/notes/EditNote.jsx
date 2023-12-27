import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import EditNoteForm from "./EditNoteForm"
import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'

const EditNote = () => {
  const { id } = useParams();

  const users = useSelector(selectAllUsers)
  const note = useSelector(state => selectNoteById(state, id));
  return (users && note) ? <EditNoteForm users={users} note={note} /> : <p>Loading...</p>
}

export default EditNote