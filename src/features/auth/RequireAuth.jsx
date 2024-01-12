import useAuth from "../../hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom";
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  // if success, outlet
  let content;
  if (roles.some(role => allowedRoles.includes(role))) {
    content = <Outlet />
  } else {
    content = <Navigate to='/login' state={{ from: location }} replace />
  }
  // if failed, redirect to login page
  return content;
}

export default RequireAuth