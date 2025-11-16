import {
  increment,
  decrement,
  setRandom,
  reset,
} from "@app/store/counter/action";
import { useDispatch, useSelector } from "react-redux";
import css from "./Counter.module.css";

type State = {
  counter: number;
};

export function Counter() {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state.counter);

  const handleRandom = () => {
    const value = Math.floor(Math.random() * 100);
    dispatch(setRandom(value));
  };

  return (
    <div className={css.counter}>
      <div className={css.buttons}>
        <button
          type="button"
          className={css.button}
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          type="button"
          className={css.button}
          onClick={() => dispatch(decrement())}
        >
          Decriment
        </button>
        <button
          type="button"
          className={css.button}
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
        <button type="button" className={css.button} onClick={handleRandom}>
          Random
        </button>
      </div>
      <div className={css.content}>{state}</div>
    </div>
  );
}
