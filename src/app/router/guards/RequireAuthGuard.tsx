import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/app/providers/AuthProvider";

function RequireAuthGuard() {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}

export default RequireAuthGuard;
