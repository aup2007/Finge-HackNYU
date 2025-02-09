import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/LoginPage" />;
  return <Outlet />;
};

export default PrivateRoute;
