import { Panel, List } from "@components/organisms";

import "./App.scss";

export default function App() {
  return (
    <>
      <header className="header">
        <div className="header__container">header</div>
      </header>
      <main className="main">
        <section className="todos" style={{ marginTop: 30 }}>
          <div className="todos__container">
            <h1>Todo List with Redux Toolkit</h1>
            <Panel />
            <List />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer__container">footer</div>
      </footer>
    </>
  );
}
