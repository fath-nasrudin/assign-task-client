// bikin form
// onSave, panggil adduser dari rtk query
// redirect ke list of user
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddUserMutation } from "./usersApiSlice"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const AddUserForm = () => {
  const [addUser, {
    isSuccess,
    isLoading,
    isError,
    error,
  }] = useAddUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(['employee']);

  const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  // validate username and password
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  // actions when save action successful
  useEffect(() => {
    if (isSuccess) {
      setUsername('');
      setPassword('');
      setRoles([]);
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])

  // input change handlers
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    setRoles(values)

  }

  // save handler
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addUser({
        username,
        password,
        roles,
      })
    }
  }

  const roleOptions = Object.values(ROLES).map(role => {
    return (
      <option
        key={role}
        value={role}
      > {role} </option>
    )
  })

  const errClass = isError ? 'errmsg' : 'offscreen';
  const validUserClass = !validUsername ? 'form__input--incomplete' : '';
  const validPwdClass = !validPassword ? 'form__input--incomplete' : '';
  const validRolesClass = !roles.length ? 'form__input--incomplete' : '';
  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>

        <div className="form__title-row">
          <h2>New User</h2>

          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        {/* username */}
        <label className="form__label" htmlFor="username">
          Username: <span className="noWrap">[3-20 letters]</span>
        </label>
        <input
          className={` form__input ${validUserClass}`}
          id='username'
          name="username"
          type='text'
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        {/* password */}
        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id='password'
          name="password"
          type='password'
          value={password}
          onChange={onPasswordChanged}
        />

        {/* roles */}
        <label className="form__label" htmlFor="roles">
          Assigned Roles:
        </label>
        <select
          className={`form__select ${validRolesClass}`}
          id="roles"
          name="roles"
          multiple={true}
          size='3'
          value={roles}
          onChange={onRolesChanged}
        >
          {roleOptions}
        </select>

      </form>
    </>
  )
}

export default AddUserForm