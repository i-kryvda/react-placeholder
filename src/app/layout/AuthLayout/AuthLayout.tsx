import { Navigate, Outlet } from "react-router";

import "./AuthLayout.scss";

import { useAuth } from "@/app/context/AuthContext";

function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-wrapper">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
