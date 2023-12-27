import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAddNoteMutation } from './notesApiSlice'

const AddNoteForm = ({ users }) => {
  const navigate = useNavigate();

  const [addNote, {
    isLoading,
    isSuccess,
    isError,
    error,
  }] = useAddNoteMutation();

  // states
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');

  // field handlers
  const onTitleChanged = e => setTitle(e.target.value);
  const onTextChanged = e => setText(e.target.value);
  const onUserIdChanged = e => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  // action handlers
  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNote({ title, text, user: userId })
    }
  }

  // handle when adding note success
  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setText('');
      setUserId('');
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  // user options
  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>{user.username}</option>
  ))

  // conditional css classes
  const errClass = isError ? 'errmsg' : 'offscreen';
  const validTitleClass = title ? '' : 'form__input--incomplete';
  const validTextClass = text ? '' : 'form__input--incomplete';

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveNoteClicked}>

        {/* form header and action buttons */}
        <h2>New Note</h2>
        <div className="form__action-buttons">
          <button
            className="icon-button"
            title="save"
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>

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
      </form>
    </>
  )
}

export default AddNoteForm