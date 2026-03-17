import { TodoForm } from "@persist-middleware/components/molecules/TodoForm/TodoForm";
import { createTodo } from "@persist-middleware/app/store/todos/todos-slice";
import { useAppDispatch } from "@persist-middleware/app/store/store";

export function CreateTodo({
  onClose,
  onSubmitSuccess,
}: {
  onClose?: () => void;
  onSubmitSuccess?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleCreateTodo = (data: { title: string; description?: string }) => {
    dispatch(createTodo(data.title, data.description));
    onSubmitSuccess?.();
  };

  return (
    <TodoForm submitText="Save" onSubmit={handleCreateTodo} onClose={onClose} />
  );
}
