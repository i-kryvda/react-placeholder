import { TodoItem } from "@components/molecules/TodoItem/TodoItem";

type TodosItemType = {
  id: number;
  text: string;
};

type TodoListType = {
  todos: TodosItemType[];
  onDelete: (todoId: number) => void;
};

export function TodoList({ todos, onDelete }: TodoListType) {
  return (
    <ul className="todos__list">
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          onDelete={onDelete}
        ></TodoItem>
      ))}
    </ul>
  );
}
