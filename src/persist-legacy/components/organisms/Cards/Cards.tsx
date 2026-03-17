import { useAppSelector } from "@persist-legacy/app/store/store";
import styles from "./Cards.module.scss";

export function Cards() {
  const { todos } = useAppSelector((state) => state.todos);

  return (
    <div className={styles.cards}>
      {todos.map((item) => (
        <div key={item.id} className={styles.card}>
          {item.title} + card
        </div>
      ))}
    </div>
  );
}
