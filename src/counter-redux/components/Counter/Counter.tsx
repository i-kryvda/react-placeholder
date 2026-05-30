import * as actions from "@redux/app/store/counter";
import { useAppDispatch, useAppSelector } from "@redux/app/store/store";
import css from "./Counter.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Counter() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.counter);

  const onIncrement = () => dispatch(actions.increment());
  const onDecrement = () => dispatch(actions.decrement());
  const onReset = () => dispatch(actions.reset());

  const handleRandom = () => {
    const value = Math.floor(Math.random() * 100);
    dispatch(actions.setRandom(value));
  };

  return (
    <div className={css.counter}>
      <div className={css.buttons}>
        <Button onClick={onIncrement}>Increment</Button>
        <Button onClick={onDecrement}>Decriment</Button>
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={handleRandom}>Random</Button>
      </div>
      <div className={css.content}>{state}</div>
    </div>
  );
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={css.button}>
      {children}
    </button>
  );
}
