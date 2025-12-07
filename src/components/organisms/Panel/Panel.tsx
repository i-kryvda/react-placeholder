import { useEffect, useRef } from "react";
import styles from "./Panel.module.scss";
import { useAppDispatch } from "@app/store/store";
import { addTodo } from "@app/store/todos/todos.slice";
import { useInput } from "@shared/hooks";

export function Panel() {
  const { value, onReset, bind } = useInput("");
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    dispatch(addTodo(value));
    onReset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder="Enter task..." {...bind} />
      <button type="submit">ADD</button>
    </form>
  );
}
