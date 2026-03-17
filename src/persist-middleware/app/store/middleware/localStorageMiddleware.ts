import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../rootReducer";

const STORAGE_KEY = "root-state";

export const localStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    // Зберігаємо тільки те, що потрібно

    const todosExclude = state.todos.todos.map(({ pinned, ...todo }) => todo);

    const stateToPersist = {
      // todos: state.todos,
      // Якщо без виключення то все просто тоді без todosExclude, зберігаємо весь state.todos
      todos: {
        ...state.todos,
        todos: todosExclude,
      }, // все з todos зберігаємо крім pinned
      // counter: state.counter,
      // counter не додаємо, для приклада
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
