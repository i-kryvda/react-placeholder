import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  setStorage,
} from "@persist-legacy/shared/utils/localStorage";
import { todosReducer } from "./todos/todos.slice";
import { counterReducer } from "./counter/counter.slice";
import { themeReducer } from "@persist-legacy/app/store/theme/theme.slice.tsx";

type RootState = {
  theme: ReturnType<typeof themeReducer>;
  todos: ReturnType<typeof todosReducer>;
  counter: ReturnType<typeof counterReducer>;
};

const STORAGE_KEYS = {
  ROOT_STATE: "rootState",
};

const preloadedState = getStorage<RootState>(STORAGE_KEYS.ROOT_STATE);

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    counter: counterReducer,
    theme: themeReducer,
  },
  preloadedState,
});

// store.subscribe(() => saveState(STORAGE_KEYS.ROOT_STATE, store.getState()));
store.subscribe(() => {
  const state = store.getState();
  const stateToSave = {
    todos: state.todos,
    counter: state.counter,
    // theme не зберігаємо
  };
  setStorage(STORAGE_KEYS.ROOT_STATE, stateToSave);
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
