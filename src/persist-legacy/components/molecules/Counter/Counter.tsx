import {
  useAppDispatch,
  useAppSelector,
} from "@persist-legacy/app/store/store";
import {
  increment,
  reset,
} from "@persist-legacy/app/store/counter/counter.slice";

export function Counter() {
  const { value } = useAppSelector((state) => state.counter);

  const dispatch = useAppDispatch();

  return (
    <div className="counter" style={{ marginBottom: 30 }}>
      <div className="buttons" style={{ display: "flex", gap: "2rem" }}>
        <button type="button" onClick={() => dispatch(increment())}>
          Plus
        </button>
        <button type="button" onClick={() => dispatch(reset())}>
          reset
        </button>
        <div className="value">{value}</div>
      </div>
    </div>
  );
}
