import { useState } from "react";
import css from "./Counter.module.css";

export function Counter() {
  const [count, setCount] = useState(0);

  const onIncrement = () => {
    setCount((с) => с + 1);
  };

  const onDecrement = () => {
    setCount((с) => с - 1);
  };
  const onReset = () => {
    setCount(0);
  };

  const onRandom = () => {
    const random = Math.floor(Math.random() * 100);
    setCount(random);
  };

  return (
    <div className={css.counter}>
      <div className={css.buttons}>
        <button type="button" className={css.button} onClick={onIncrement}>
          Increment
        </button>
        <button type="button" className={css.button} onClick={onDecrement}>
          Decriment
        </button>
        <button type="button" className={css.button} onClick={onReset}>
          Reset
        </button>
        <button type="button" className={css.button} onClick={onRandom}>
          Random
        </button>
      </div>
      <div className={css.content}>{count}</div>
    </div>
  );
}
