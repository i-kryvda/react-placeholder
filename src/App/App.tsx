import { useCounter, ContextProvider } from "./context/counter/CounterContext";
import { onIncrement, onDecrement, onRandom } from "./context/counter/action";

import "./App.css";

export default function App() {
  return (
    <>
      <ContextProvider>
        <Content></Content>
      </ContextProvider>
    </>
  );
}

function Content() {
  const { count, dispatch } = useCounter();

  const handleRandom = () => {
    const rnd = Math.floor(Math.random() * 10);
    dispatch(onRandom(rnd));
  };

  return (
    <>
      <div style={{ display: "flex", gap: 30, marginBottom: 50 }}>
        <button
          type="button"
          className="button"
          onClick={() => dispatch(onIncrement())}
        >
          Increment
        </button>
        <button
          type="button"
          className="button"
          onClick={() => dispatch(onDecrement())}
        >
          Decrement
        </button>
        <button type="button" className="button" onClick={handleRandom}>
          Random
        </button>
      </div>

      <div className="info">Counter: {count}</div>
    </>
  );
}
