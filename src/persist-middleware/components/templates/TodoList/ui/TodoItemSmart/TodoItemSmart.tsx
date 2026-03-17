import { useState } from "react";
import { useAppDispatch } from "@persist-middleware/app/store/store";
import { deleteTodo } from "@persist-middleware/app/store/todos/todos-slice";
import type { TodoType } from "@persist-middleware/app/store/todos/todos-types";
import { useModalStack } from "@persist-middleware/app/context/ModalProvider/ModalProvider";
import { EditTodo } from "@persist-middleware/components/organisms/EditTodo/EditTodo";
import { TodoItem } from "@persist-middleware/components/molecules/TodoItem/TodoItem";
import { ConfirmDeleteModal } from "@persist-middleware/components/organisms/ConfirmDeleteModal/ConfirmDeleteModal";

export function TodoItemSmart({ todo }: { todo: TodoType }) {
  const [isEditing, setEditing] = useState(false);
  const { openModal, closeModal } = useModalStack();
  const dispatch = useAppDispatch();

  const confirmDelete = (id: string) => dispatch(deleteTodo({ id }));

  const handleDelete = (id: string) => {
    openModal((modalId) => (
      <ConfirmDeleteModal
        onConfirm={() => confirmDelete(id)}
        onClose={() => closeModal(modalId)}
      />
    ));
  };

  return (
    <>
      {isEditing ? (
        <EditTodo todo={todo} onClose={() => setEditing(false)} />
      ) : (
        <TodoItem
          todo={todo}
          onEdit={() => setEditing(true)}
          onDelete={(id) => handleDelete(id)}
        />
      )}
    </>
  );
}
