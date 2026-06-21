import { Link, Outlet } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import "./RootLayout.scss";

export default function RootLayout() {
  const { logOut } = useAuth();

  return (
    <>
      <header className="header">
        <div className="header__container">
          <nav className="header__nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/feed">Feed</Link>
          </nav>
          <button type="button" onClick={logOut}>
            logout
          </button>
        </div>
      </header>
      <main className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="footer__container">footer</div>
      </footer>
    </>
  );
}
