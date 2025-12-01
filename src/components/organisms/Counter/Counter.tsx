import { useAppDispatch, useAppSelector } from "@app/store/store";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@app/store/counter/counter.slice";
import s from "./Counter.module.css";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className={s.counter}>
      <div className={s.buttons}>
        <button className="button" onClick={() => dispatch(increment())}>
          increment
        </button>
        <button type="button" onClick={() => dispatch(decrement())}>
          decrement
        </button>
        <button type="button" onClick={() => dispatch(incrementByAmount(20))}>
          By Amount
        </button>
      </div>
      <div className={s.value}>{count}</div>
    </div>
  );
}
