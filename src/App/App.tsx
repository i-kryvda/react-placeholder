import { Sidebar } from "@components/templates/Sidebar/Sidebar";
import { IoAdd } from "react-icons/io5";

import "./App.scss";

export default function App() {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="app">
        <header className="header">
          <div className="header__container">TODOLIST</div>
        </header>
        <main className="main">
          <section className="todo-action">
            <div className="todo-action__container">
              {/* <h1 className="todo-action__title">Active</h1> */}
              <div className="todo-action__editor">
                <button
                  type="button"
                  className="todo-action__add-btn"
                  aria-label="open todo editor"
                >
                  <IoAdd className="icon" /> <span>Create a task</span>
                </button>

                <form className="todo-editor">
                  <div className="todo-editor__box">
                    <label htmlFor="todo-title" className="todo-editor__label">
                      Title
                    </label>
                    <input
                      type="text"
                      id="todo-title"
                      className="todo-editor__input"
                      placeholder="Task title"
                    />
                    <label
                      htmlFor="todo-description"
                      className="todo-editor__label"
                    >
                      Description
                    </label>
                    <textarea
                      id="todo-description"
                      className="todo-editor__input"
                      placeholder="Task description"
                    ></textarea>
                  </div>
                  <div className="todo-editor__actions">
                    <button
                      type="button"
                      className="todo-editor__btn todo-editor__btn--cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="todo-editor__btn todo-editor__btn--submit"
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="footer__container">footer</div>
        </footer>
      </div>
    </>
  );
}
