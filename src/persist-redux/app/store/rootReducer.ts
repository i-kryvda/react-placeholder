import { combineReducers } from "@reduxjs/toolkit";
import { createTransform, persistReducer } from "redux-persist";
import type { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { counterReducer } from "@persist-redux/app/store/counter/counter.slice";
import { todosReducer } from "@persist-redux/app/store/todos/todos-slice";
import type { TodosState, TodoType } from "./todos/todos-types";

// createTransform<A, B>
// A - Type state in Redux (що живе у пам'яті)
// B - Type state in LocalStorage (що зберігаєтся на диску)
// SetTransform можна покласти todos-transform (якщо складний)

type PersistedTodo = Omit<TodoType, "pinned">;
type PersistedTodosState = Omit<TodosState, "todos"> & {
  todos: PersistedTodo[];
};

//  createTransform<TodosState, TodosState> - Можна й так, це не так професійно, але код не зламає
const SetTransform = createTransform<TodosState, PersistedTodosState>(
  // Виключити якесь поле
  (inboundState) => ({
    ...inboundState,
    todos: inboundState.todos.map(({ pinned, ...rest }) => rest),
  }),
  // Встановити за замовченням
  (outboundState) => ({
    ...outboundState,
    todos: outboundState.todos.map((todo) => ({ ...todo, pinned: false })),
  }),
  { whitelist: ["todos"] },
);

// Типізувати треба якщо використовуємо transforms
// Звісно можна винести в окремий файл store/persist-config
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  blacklist: ["counter"],
  transforms: [SetTransform],
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistedReducer = persistReducer(persistConfig, rootReducer);
