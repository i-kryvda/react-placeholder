import { useAppDispatch } from "@persist-legacy/app/store/store";
import styles from "./Item.module.scss";
import type { TodoItem } from "@persist-legacy/app/store/todos/todos.types";
import {
  deleteTodo,
  editTodo,
  completeTodo,
} from "@persist-legacy/app/store/todos/todos.slice";
import { useState } from "react";
import { useInput } from "@persist-legacy/shared/hooks";

type ItemProps = {
  item: TodoItem;
};

export function Item({ item }: ItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { value, onChange } = useInput("");
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(editTodo({ id: item.id, title: value }));
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <>
          <input value={value} onChange={onChange} />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <p
            onClick={() => dispatch(completeTodo(item.id))}
            style={{ color: item.completed ? "green" : "" }}
          >
            {item.title}
          </p>
          <div className={styles.buttons}>
            <button
              type="button"
              className="button"
              onClick={() => setIsEditing(true)}
            >
              EDIT
            </button>
            <button
              type="button"
              className="button"
              onClick={() => dispatch(deleteTodo(item.id))}
            >
              DEL
            </button>
            <button onClick={() => dispatch(completeTodo(item.id))}>
              {item.completed ? "Undo" : "Complete"}
            </button>
          </div>
        </>
      )}
    </li>
  );
}
