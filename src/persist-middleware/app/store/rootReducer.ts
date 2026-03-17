import { combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "@persist-middleware/app/store/counter/counter.slice";
import { todosReducer } from "@persist-middleware/app/store/todos/todos-slice";

export const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
