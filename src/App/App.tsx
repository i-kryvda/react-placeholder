import { useState } from "react";
import { useModalManager } from "@app/context/ModalManager/ModalManager.tsx";
import { ConfirmDeleteModal } from "@components/molecules/ConfirmDeleteModal/ConfirmDeleteModal.tsx";
import "./App.scss";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "todo1" },
    { id: 2, title: "todo2" },
    { id: 3, title: "todo3" },
    { id: 4, title: "todo4" },
    { id: 5, title: "todo5" },
    { id: 6, title: "todo6" },
    { id: 7, title: "todo7" },
    { id: 8, title: "todo8" },
    { id: 9, title: "todo9" },
    { id: 10, title: "todo10" },
    { id: 11, title: "todo11" },
    { id: 12, title: "todo12" },
  ]);

  const { openModal, closeModal } = useModalManager();

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenModal = (id: number) => {
    openModal(
      (modalId) => (
        <ConfirmDeleteModal
          onClose={() => closeModal(modalId)}
          onConfirm={() => deleteTodo(id)}
        />
      ),
      { closeOnOverlayClick: true, closeOnEscape: false }, // опционально, по умолчанию true
    );
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
                <button type="button" onClick={() => handleOpenModal(item.id)}>
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
