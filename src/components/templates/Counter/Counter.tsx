import { useAppDispatch, useAppSelector } from "@app/store/store";
import { increment, reset } from "@app/store/counter/counter.slice";
import { Button } from "@components/atoms/Button/ui";
import s from "./Counter.module.scss";

export function Counter() {
  const { value } = useAppSelector((state) => state.counter);

  const dispatch = useAppDispatch();

  return (
    <div className={s.counter}>
      <div className={s.counterButtons}>
        <Button onClick={() => dispatch(increment())}>Plus</Button>
        <Button variant="danger" onClick={() => dispatch(reset())}>
          reset
        </Button>
        <div className={s.counterResult}>: {value}</div>
      </div>
    </div>
  );
}
