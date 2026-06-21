import { createContext, useContext, useState } from "react";

type AuthType = {
  auth: boolean;
  logIn: () => void;
  logOut: () => void;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthType | null>(null);

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  const logIn = () => {
    localStorage.setItem("auth", "true");
    setAuth(true);
  };
  const logOut = () => {
    localStorage.removeItem("auth");
    setAuth(false);
  };

  return <AuthContext.Provider value={{ auth, logIn, logOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used inside AuthProvider");

  return context;
};
