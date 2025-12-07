import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TodoItem, TodoState } from "./todos.types";

const initialState: TodoState = {
  todos: [],
  view: "list",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<TodoItem>) {
        state.todos.push(action.payload);
      },
      prepare(title: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        };
      },
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
