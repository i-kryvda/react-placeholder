import { useAppDispatch } from "@persist-middleware/app/store/store";
import { updateTodo } from "@persist-middleware/app/store/todos/todos-slice";
import { TodoForm } from "@persist-middleware/components/molecules/TodoForm/TodoForm";

export function EditTodo({
  todo,
  onClose,
}: {
  todo: { id: string; title: string; description?: string };
  onClose?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: { title: string; description?: string }) => {
    dispatch(
      updateTodo({
        id: todo.id,
        title: data.title,
        description: data.description,
      }),
    );
    onClose?.();
  };

  return (
    <TodoForm
      initialTitle={todo.title}
      initialDescription={todo.description}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
