// ЗВИЧАЙНИЙ ПРИКЛАД КОНТЕКСТУ З USE-REDUCER

import { createContext, useContext, useReducer } from "react";

export const ACTIONS = {
  INC: "INCREMENT",
  DEC: "DECREMET",
  RND: "RANDOM",
} as const;

type Action =
  | { type: typeof ACTIONS.INC }
  | { type: typeof ACTIONS.DEC }
  | { type: typeof ACTIONS.RND; payload: number }
  | { type: "RESET" };

type State = {
  counter: number;
};

type CounterContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const CounterContext = createContext<CounterContextType | null>(null);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ACTIONS.INC:
      return { ...state, counter: state.counter + 1 };
    case ACTIONS.DEC:
      return { ...state, counter: state.counter - 1 };
    case ACTIONS.RND:
      return { ...state, counter: action.payload };
    case "RESET":
      return { ...state, counter: 0 };
    default:
      return state;
  }
}

const initialState: State = {
  counter: 0,
};

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const ctx = useContext(CounterContext);
  if (!ctx) throw new Error("Problem in the TodoContext");

  return ctx;
}
