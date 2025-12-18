import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // User not logged in → redirect to signin
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  return children;
}
