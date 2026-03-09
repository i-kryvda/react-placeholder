import { useAppSelector } from "@app/store/store";
import { Item } from "@components/molecules/Item/Item";
import styles from "./List.module.scss";
import { selectSearchTodos } from "@app/store/todos/todos.selector";

export function List() {
  const todos = useAppSelector(selectSearchTodos);

  return (
    <ul className={styles.list}>
      {todos.map((item) => (
        <Item key={item.id} item={item}></Item>
      ))}
    </ul>
  );
}
