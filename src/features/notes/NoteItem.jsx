import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { selectNoteById } from "./notesApiSlice"

const NoteItem = ({ noteId }) => {
  const navigate = useNavigate();
  const note = useSelector(state => selectNoteById(state, noteId));

  if (note) {
    const dateCreated = new Date(note.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'long' })

    const dateUpdated = new Date(note.updatedAt).toLocaleString('id-ID', { day: 'numeric', month: 'long' })

    const handleEdit = () => { navigate(`/dash/notes/edit/${noteId}`) }
    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed
            ? <span className="note__status--completed">Completed</span>
            : <span className="note__status--open">Open</span>
          }
        </td>

        <td className="table__cell note__created">{dateCreated}</td>
        <td className="table__cell note__updated">{dateUpdated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.user.username}</td>

        <td className="table__cell">
          <button
            className="table__button icon-button"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null;

}

export default NoteItem