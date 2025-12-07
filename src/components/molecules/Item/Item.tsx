import { useAppDispatch } from "@app/store/store";
import styles from "./Item.module.scss";
import type { TodoItem } from "@app/store/todos/todos.types";
import { deleteTodo } from "@app/store/todos/todos.slice";

type ItemProps = {
  item: TodoItem;
};

export function Item({ item }: ItemProps) {
  const dispatch = useAppDispatch();

  return (
    <li className={styles.item}>
      <span>{item.title}</span>
      <button
        type="button"
        className="button"
        onClick={() => dispatch(deleteTodo(item.id))}
      >
        DEL
      </button>
    </li>
  );
}
