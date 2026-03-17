import { useState } from "react";
import {
  selectHasCompleted,
  selectFilter,
  selectSearchTodos,
} from "@persist-redux/app/store/todos/todos-selectors";
import { clearCompleted } from "@persist-redux/app/store/todos/todos-slice";
import { useAppDispatch, useAppSelector } from "@persist-redux/app/store/store";
import { TodoCardView, TodoListView } from "./ui";
import { EmptyState } from "@persist-redux/components/atoms/EmptyState/EmptyState";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { AiOutlineClear } from "react-icons/ai";
import s from "./TodoList.module.scss";
import { ConfirmDeleteModal } from "@persist-redux/components/organisms/ConfirmDeleteModal/ConfirmDeleteModal";
import { useModalStack } from "@persist-redux/app/context/ModalProvider/ModalProvider";
import { Counter } from "@persist-redux/components/molecules/Counter/Counter";

type View = "list" | "card";

export function TodoList() {
  const [view, setView] = useState<View>("list");
  const todos = useAppSelector(selectSearchTodos);
  const hasCompleted = useAppSelector(selectHasCompleted);
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const { openModal, closeModal } = useModalStack();

  const handleDelete = () => {
    openModal((modalId) => (
      <ConfirmDeleteModal
        onConfirm={() => dispatch(clearCompleted())}
        onClose={() => closeModal(modalId)}
      />
    ));
  };

  // title:   Delete todos
  // message: Are you sure you want to delete these todos?

  return (
    <section className={s.todo} aria-labelledby="todo-section__title">
      <h2 className="todo-section__title visually-hidden">Your Todos List</h2>
      <Counter />
      <div className={s.todoHeader}>
        <button
          type="button"
          className={s.todoToggleViewButton}
          aria-label="Toggle todo view"
          disabled={todos.length === 0}
          onClick={() => setView((prev) => (prev === "list" ? "card" : "list"))}
        >
          <span>{view === "list" ? "Card view" : "List view"}</span>
          {view === "list" ? <HiOutlineViewGrid /> : <HiOutlineViewList />}
        </button>

        {filter === "completed" && (
          <button
            type="button"
            className={s.todoToggleViewButton}
            disabled={!hasCompleted}
            aria-label="Clear completed todos"
            style={{
              border: "none",
            }}
            // onClick={() => dispatch(clearCompleted())}
            onClick={() => handleDelete()}
          >
            <span>clear all {filter}</span>
            <AiOutlineClear style={{ transform: "rotate(25deg)" }} />
          </button>
        )}
      </div>

      <div className={s.todoBody}>
        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {view === "list" && <TodoListView todos={todos} />}
            {view === "card" && <TodoCardView todos={todos} />}
          </>
        )}
      </div>
    </section>
  );
}
