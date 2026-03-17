import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { counterReducer } from "@persist-redux/app/store/counter/counter.slice";
import { todosReducer } from "@persist-redux/app/store/todos/todos-slice";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistedReducer = persistReducer(persistConfig, rootReducer);
