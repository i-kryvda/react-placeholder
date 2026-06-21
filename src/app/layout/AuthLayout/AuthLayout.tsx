import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";

import "./AuthLayout.scss";

function AuthLayout() {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-wrapper">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
