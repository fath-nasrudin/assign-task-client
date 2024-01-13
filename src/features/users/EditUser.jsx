import { useSelector } from "react-redux";
import { selectUserById, useGetUsersQuery } from "./usersApiSlice"
import EditUserForm from "./EditUserForm";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data.entities[id]
    })
  })

  return (user) ? <EditUserForm user={user} /> : <p>Loading...</p>
}

export default EditUser