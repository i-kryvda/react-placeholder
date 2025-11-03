import { createContext, useContext, useReducer } from "react";
import { counterReducer, initialState } from "./reducer";
import type { CounterContextType } from "./types";

const CounterContext = createContext<CounterContextType | null>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterContext.Provider value={{ count: state.count, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("CounterContext має проблеми!");
  }
  return context;
}
