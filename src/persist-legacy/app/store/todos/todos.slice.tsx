import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoItem, TodoState } from "./todos.types";

export const initialState: TodoState = {
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
    editTodo(state, action: PayloadAction<{ id: string; title: string }>) {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) todo.title = action.payload.title;
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    toggleView(state) {
      state.view = state.view === "list" ? "card" : "list";
    },
  },
});

export const { addTodo, deleteTodo, editTodo, completeTodo, toggleView } =
  todosSlice.actions;
export const todosReducer = todosSlice.reducer;
