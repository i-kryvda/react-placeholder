// import { createSelector } from "@reduxjs/toolkit";

import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "../store";

export const selectTodos = (state: AppState) => state.todos.todos;
export const selectSearchQuery = (state: AppState) => state.todos.searchQuery;

export const selectSearchTodos = createSelector(
  [selectTodos, selectSearchQuery],
  (todos, query) => {
    if (!query) return todos;

    return todos.filter((todo) => todo.title.startsWith(query));
  },
);
