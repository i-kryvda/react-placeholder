import { Sidebar } from "@components/templates/Sidebar/Sidebar";

import "./App.scss";

export default function App() {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="app">
        <header className="header">
          <div className="header__container">Redux</div>
        </header>
        <main className="main">
          <h1 className="main__container">main</h1>
        </main>
        <footer className="footer">
          <div className="footer__container">footer</div>
        </footer>
      </div>
    </>
  );
}
