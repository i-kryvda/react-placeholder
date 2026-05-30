import { ACTIONS, useCounter } from "@context/app/store/context";

export function Counter() {
  const { state, dispatch } = useCounter();

  const onIncrement = () => dispatch({ type: ACTIONS.INC });
  const onDecrement = () => dispatch({ type: ACTIONS.DEC });
  const onRandom = () => {
    const value = Math.floor(Math.random() * 10);
    dispatch({ type: ACTIONS.RND, payload: value });
  };

  return (
    <div className="my-10">
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="p-3 border border-white rounded-[10px] cursor-pointer"
          onClick={onIncrement}
        >
          Increment
        </button>
        <button
          type="button"
          className="p-3 border border-white rounded-[10px] cursor-pointer"
          onClick={onDecrement}
        >
          Decriment
        </button>
        <button
          type="button"
          className="p-3 border border-white rounded-[10px] cursor-pointer"
          onClick={onRandom}
        >
          Random
        </button>
        <div className="bg-blue-500 py px-2 rounded-full">{state.counter}</div>
      </div>
    </div>
  );
}
