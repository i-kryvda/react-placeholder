import { createContext, useContext, useState } from "react";

type AuthType = {
  logIn: (accessToken: string) => void;
  logOut: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const logIn = (accessToken: string) => {
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ logIn, logOut, isAuthenticated: Boolean(token) }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used inside AuthProvider");

  return context;
};
