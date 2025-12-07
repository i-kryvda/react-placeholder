import "./App.css";

export default function App() {
  return (
    <>
      <header className="header">
        <div className="header__container">header</div>
      </header>
      <main className="main">
        <div className="main__container">
          <div className="todo">
            <div className="todo__title">Todo List + Redux</div>
            <form className="todo__pannel">
              <input type="text" />
            </form>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="footer__container">footer</div>
      </footer>
    </>
  );
}
