import { TodoItemSmart } from "../TodoItemSmart";
import type { TodoType } from "@persist-redux/app/store/todos/todos-types";
import s from "./TodoListView.module.scss";

interface Props {
  todos: TodoType[];
}

export function TodoListView({ todos }: Props) {
  return (
    <ul className={s.list}>
      {todos.map((item) => (
        <li key={item.id} className={s.listItem}>
          <TodoItemSmart todo={item} />
        </li>
      ))}
    </ul>
  );
}
