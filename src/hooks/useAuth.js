import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isManager = false;
  let status = 'employee';

  if (token) {
    // const { username, roles } = jwtDecode(token);
    const { UserInfo } = jwtDecode(token);
    const { username, roles } = UserInfo;

    isManager = roles.includes('manager');
    isAdmin = roles.includes('admin');

    if (isManager) status = 'manager';
    if (isAdmin) status = 'admin';

    return { username, roles, isAdmin, isManager, status, }
  }

  return { username: '', roles: [], isAdmin, isManager, status, }
}

export default useAuth