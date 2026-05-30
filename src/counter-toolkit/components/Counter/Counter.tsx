import { increment, decrement, random } from "@toolkit/app/store/counter";
import { useAppDispatch, useAppSelector } from "@toolkit/app/store/store";
import {
  selectCounter,
  selectDoubleCounter,
} from "@toolkit/app/store/selectors";

import css from "./Counter.module.css";

export function Counter() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectCounter);
  const dubleValue = useAppSelector(selectDoubleCounter);

  // const handleRandom = () => {
  //   const value = Math.floor(Math.random() * 100);
  //   dispatch(random(value));
  // };

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
        {/* <button
          type="button"
          className={css.button}
          onClick={() => dispatch(reset())}
        >
          Reset
        </button> */}
        {/* <button type="button" className={css.button} onClick={handleRandom}>
          Random
        </button> */}
      </div>
      <div className={css.content}>{value}</div>
      <div className={css.content}>{dubleValue}</div>
    </div>
  );
}
