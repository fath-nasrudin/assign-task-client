import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from './usersApiSlice'

const UserItem = ({ userId }) => {
  const navigate = useNavigate();
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data.entities[userId]
    })
  })

  if (!user) return null;

  const handleEdit = () => {
    navigate(`/dash/users/edit/${userId}`)
  };

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