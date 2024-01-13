import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  useTitle('Dashboard')

  const { isAdmin, isManager } = useAuth()

  const date = new Date()
  const today = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'long' }).format(date);

  return (
    <section className="welcome">

      <p>{today}</p>

      <h1>Welcome!</h1>

      <p><Link to="/dash/notes">View techNotes</Link></p>
      <p><Link to="/dash/notes/add">Add New Note</Link></p>

      {(isAdmin || isManager) && <p><Link to="/dash/users">View User Settings</Link></p>}

      {(isAdmin || isManager) && <p><Link to="/dash/users/add">Add New User</Link></p>}

    </section>
  )
}

export default Welcome