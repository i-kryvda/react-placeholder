import { useState } from "react";
import { useModalManager } from "@app/context/ModalManager/ModalManager.tsx";
import "./App.scss";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "todo1" },
    { id: 2, title: "todo2" },
    { id: 3, title: "todo3" },
  ]);

  const { openModal } = useModalManager();

  const handleOpenModal = () => {
    openModal(<div>Confirm Delete</div>);
  };

  return (
    <>
      <header className="header">
        <div className="header__container">header</div>
      </header>
      <main className="main">
        <div className="main__container">
          <ul className="todo-list" style={{ paddingTop: 50 }}>
            {todos.map((item) => (
              <li className="todo-list__item" key={item.id}>
                <p> {item.title}</p>
                <button type="button" onClick={() => handleOpenModal()}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="footer">
        <div className="footer__container">footer</div>
      </footer>
    </>
  );
}
