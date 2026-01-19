import { useState } from "react";
import { TodoEditor } from "@components/organisms/TodoEditor/TodoEditor";
import { FaArrowDown } from "react-icons/fa6";
import { Sidebar } from "@components/templates/Sidebar/Sidebar";

import "./App.scss";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="app">
        <header className="header">
          <div className="header__container">TODOLIST</div>
        </header>
        <main className="main">
          <div className="main__container">
            {!isOpen && (
              <section
                className="todo-entry"
                aria-labelledby="todo-entry-title"
              >
                <h1 id="todo-entry-title" className="visually-hidden">
                  Create your first todo
                </h1>
                <div className="todo-entry__body">
                  <FaArrowDown className="todo-entry__icon" />
                  <button
                    type="button"
                    className="todo-entry__button"
                    onClick={() => setIsOpen(true)}
                  >
                    Create a task
                  </button>
                </div>
              </section>
            )}

            {isOpen && (
              <section
                className="todo-editor-section"
                aria-labelledby="todo-editor-title"
              >
                <h2 id="todo-editor-title" className="visually-hidden">
                  Todo Editor
                </h2>
                <TodoEditor onClose={() => setIsOpen(false)}></TodoEditor>
              </section>
            )}
          </div>
        </main>
        <footer className="footer">
          <div className="footer__container">footer</div>
        </footer>
      </div>
    </>
  );
}

// import { IoAdd } from "react-icons/io5";
// <button
//                 type="button"
//                 className="todo-action__add-btn"
//                 aria-label="open todo editor"
//                 onClick={() => setIsOpen(!isOpen)}
//               >
//                 <IoAdd className="icon" /> <span>Create a task</span>
//               </button>
