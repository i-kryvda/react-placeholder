import { useTodos } from "@app/context/todos/TodosProvider";
import { TodoPannel } from "@components/molecules/TodoPannel/TodoPannel";
import { TodoList } from "@components/organisms/TodoList/TodoList";

export function TodosPage() {
  const { todos, createTodo, deleteTodo } = useTodos();

  return (
    <>
      <div className="todos">
        <TodoPannel add={createTodo} />
        <TodoList todos={todos} onDelete={deleteTodo}></TodoList>
      </div>
    </>
  );
}
