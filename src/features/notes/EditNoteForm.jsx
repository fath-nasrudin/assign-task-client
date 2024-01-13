import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { useUpdateNoteMutation, useDeleteNoteMutation, } from './notesApiSlice'

const AddNoteForm = ({ users, note }) => {
  useTitle('Edit Note');

  const navigate = useNavigate();
  const { isAdmin, isManager } = useAuth();

  const [updateNote, {
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  }] = useUpdateNoteMutation();

  const [deleteNote, {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  }] = useDeleteNoteMutation();

  // states
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [userId, setUserId] = useState(note.user.id);
  const [completed, setCompleted] = useState(note.completed);

  // field handlers
  const onTitleChanged = e => setTitle(e.target.value);
  const onTextChanged = e => setText(e.target.value);
  const onUserIdChanged = e => setUserId(e.target.value);
  const onCompletedChanged = () => setCompleted(prev => !prev);

  const canSave = [title, text, userId].every(Boolean) && !isUpdateLoading

  // action handlers
  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateNote({ id: note.id, title, text, user: userId, completed })
    }
  }

  const onDeleteNoteClicked = async (e) => {
    e.preventDefault();
    if (isAdmin || isManager) {
      await deleteNote({ id: note.id })
    } else {
      console.log('Need admin or manager privelleged')
    }
  }

  // handle when adding note success
  useEffect(() => {
    if (isDeleteSuccess || isUpdateSuccess) {
      setTitle('');
      setText('');
      setUserId('');
      navigate('/dash/notes')
    }
  }, [isUpdateSuccess, isDeleteSuccess, navigate])


  // date format
  const created = new Date(note.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(note.updatedAt).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

  // user options
  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>{user.username}</option>
  ))

  // conditional css classes
  const errClass = (isDeleteError || isUpdateError) ? 'errmsg' : 'offscreen';
  const validTitleClass = title ? '' : 'form__input--incomplete';
  const validTextClass = text ? '' : 'form__input--incomplete';

  const errContent = (updateError?.data?.message || deleteError?.data?.message) ?? ''

  let deleteButton = null
  if (isAdmin || isManager) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    )
  }

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>

        {/* form header and action buttons */}
        <h2>Edit Note #{note.ticket}</h2>

        <div className="form__action-buttons">

          {/* update button */}
          <button
            className="icon-button"
            title="save"
            disabled={!canSave}
            onClick={onSaveNoteClicked}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>

          {/* delete button */}
          {deleteButton}
        </div >


        {/* title field */}
        <label htmlFor="title" className="form__label">Title:</label>
        <input
          className={`form__input ${validTitleClass}`}
          id='title'
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        {/* text field */}
        <label htmlFor="text" className="form__label">Text:</label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />


        <div className="form__row">
          <div className="form__divider">

            {/* Complete Checkbox Field */}
            <label htmlFor="note-completed" className="form__label form__checkbox-container">WORK COMPLETE</label>
            <input
              className="form__checkbox"
              id="note-completed"
              name="completed"
              type="checkbox"
              checked={completed}
              onChange={onCompletedChanged}
            />

            {/* user field  */}
            <label htmlFor="user" className="form__label">ASSIGNED TO:</label>
            <select
              className="form__select"
              id="user"
              name="user"
              value={userId}
              onChange={onUserIdChanged}
            >
              <option value=""></option>
              {userOptions}
            </select>


          </div>
          <div className="form__divider">
            <p className="form__created">Created:<br />{created}</p>
            <p className="form__updated">Updated:<br />{updated}</p>
          </div>

        </div>

      </form>
    </>
  )
}

export default AddNoteForm