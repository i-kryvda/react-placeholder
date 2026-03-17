import { useAppSelector } from "@persist-legacy/app/store/store";
import { Item } from "@persist-legacy/components/molecules/Item/Item";
import styles from "./List.module.scss";

export function List() {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <ul className={styles.list}>
      {todos.map((item) => (
        <Item key={item.id} item={item}></Item>
      ))}
    </ul>
  );
}
