import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/app/context/AuthContext";

function RequireAuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}

export default RequireAuthGuard;
