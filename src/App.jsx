import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import { Routes, Route } from 'react-router-dom'
import AddUserForm from './features/users/AddUserForm'
import EditUser from './features/users/EditUser'
import Prefetch from './features/auth/Prefetch'
import AddNote from './features/notes/AddNote'
import EditNote from './features/notes/EditNote'
import PersistLogin from './features/auth/PersistLogin'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path='dash' element={<DashLayout />} >
              <Route index element={<Welcome />} />

              <Route path='users'>
                <Route index element={<UsersList />} />
                <Route path='add' element={<AddUserForm />} />
                <Route path='edit/:id' element={<EditUser />} />
              </Route>

              <Route path='notes'>
                <Route index element={<NotesList />} />
                <Route path='add' element={<AddNote />} />
                <Route path='edit/:id' element={<EditNote />} />
              </Route>
            </Route>

          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
