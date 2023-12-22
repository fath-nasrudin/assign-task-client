import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login'
import DashLayout from './components/DashLayout'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='dash' element={<DashLayout />} />
      </Route>
    </Routes>
  )
}

export default App
