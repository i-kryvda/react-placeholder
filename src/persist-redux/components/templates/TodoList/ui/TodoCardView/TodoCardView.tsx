import { TodoItemSmart } from "../TodoItemSmart";

import s from "./TodoCardView.module.scss";

import type { TodoType } from "@persist-redux/app/store/todos/todos-types";
interface Props {
  todos: TodoType[];
}

export function TodoCardView({ todos }: Props) {
  return (
    <ul className={s.card}>
      {todos.map((todo) => (
        <TodoItemSmart key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
