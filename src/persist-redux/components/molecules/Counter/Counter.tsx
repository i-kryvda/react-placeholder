import {
  increment,
  decrement,
  random,
} from "@persist-redux/app/store/counter/counter.slice";
import { useAppDispatch, useAppSelector } from "@persist-redux/app/store/store";

import styles from "./counter.module.scss";

export const Counter = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.counter.value);

  return (
    <div className={styles.counter}>
      <p className={styles.value}>{value}</p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => dispatch(increment())}
        >
          Plus
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => dispatch(decrement())}
        >
          Minus
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => dispatch(random())}
        >
          random
        </button>
      </div>
    </div>
  );
};
