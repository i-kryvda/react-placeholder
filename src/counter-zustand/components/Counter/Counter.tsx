import { useCountStore } from "@zxcZustand/app/store/store";

export function Counter() {
  const { increment, decrement, random, reset, counter } = useCountStore();

  const handleRandom = () => {
    const nextValue = Math.floor(Math.random() * 10);
    random(nextValue);
  };

  return (
    <div className="my-10">
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="p-3 border border-white rounded-[10px] cursor-pointer"
          onClick={() => increment(1)}
        >
          increment
        </button>
        <button
          type="button"
          className="p-3 border border-white rounded-[10px] cursor-pointer"
          onClick={() => decrement(1)}
        >
          decrement
        </button>
        <button
          type="button"
          className="p-3 border border-white rounded-[10px] cursor-pointer"
          onClick={handleRandom}
        >
          random
        </button>
        <button
          type="button"
          className="p-3 border border-white rounded-[10px] cursor-pointer"
          onClick={() => reset()}
        >
          reset
        </button>
        <div>{counter}</div>
      </div>
    </div>
  );
}
