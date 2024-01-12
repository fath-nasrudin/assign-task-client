import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isAdmin, isManager } = useAuth()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small"
  }

  const onUserListButtonClicked = () => navigate('/dash/users')
  const onNewUserButtonClicked = () => navigate('/dash/users/add')
  const onNoteListButtonClicked = () => navigate('/dash/notes')
  const onNewNoteButtonClicked = () => navigate('/dash/notes/add')

  // Buttons
  const logoutButton = (
    <button
      className="icon-button"
      title="Logout"
      onClick={sendLogout}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  let userListButton = null
  if ((isAdmin || isManager) && !USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
    userListButton = (
      <button
        className='icon-button'
        title='Users'
        onClick={onUserListButtonClicked}
      >
        <FontAwesomeIcon icon={faUserGear} />
      </button>
    )
  }

  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className='icon-button'
        title='New User'
        onClick={onNewUserButtonClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    )
  }

  let noteListButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    noteListButton = (
      <button
        className='icon-button'
        title='Notes'
        onClick={onNoteListButtonClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    )
  }

  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className='icon-button'
        title='New Note'
        onClick={onNewNoteButtonClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    )
  }

  let buttonContent
  if (isLoading) {
    buttonContent = <p>Logging out...</p>
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {noteListButton}
        {newUserButton}
        {userListButton}

        {logoutButton}
      </>
    )
  }

  const errorClass = isError ? 'errmsg' : 'offscreen'

  const content = (
    <>
      <p className={errorClass}>{error?.data?.message}</p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">
            {buttonContent}
          </nav>
        </div>
      </header>
    </>
  )

  return content
}
export default DashHeader