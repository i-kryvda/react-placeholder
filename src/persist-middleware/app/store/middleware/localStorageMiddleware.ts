import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../rootReducer";

const STORAGE_KEY = "root-state";

export const localStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    // Зберігаємо тільки те, що потрібно
    const stateToPersist = {
      todos: state.todos, // все з todos зберігаємо
      counter: {
        // можна виключити конкретні поля
        ...state.counter,
        value: undefined, // value не зберігати
      },
      // theme не додаємо → slice виключено
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    return result;
  };

export const loadFromLocalStorage = (): Partial<RootState> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
};
