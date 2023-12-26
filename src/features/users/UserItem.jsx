import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux"
import { selectUserById } from './usersApiSlice'

const UserItem = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId));

  if (!user) return null;

  const handleEdit = () => { console.log('Edit feature not yet implemented') };

  const cellStatus = user.active ? '' : 'table__cell--inactive';
  const userRolesString = user.roles.join(', ');

  return (
    <tr className="table__row user">

      <td className={`table__cell ${cellStatus}`}>{user.username}</td>
      <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>

      <td className={`table__cell ${cellStatus}`}>
        <button
          className="table__button icon-button"
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>

    </tr>
  )
}

export default UserItem