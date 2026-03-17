import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "@persist-redux/app/store/store.tsx";

export const selectTodos = (state: AppState) => state.todos.todos;
export const selectFilter = (state: AppState) => state.todos.filter;
export const selectSearchQuery = (state: AppState) => state.todos.searchQuery;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  },
);

export const selectSortedTodos = createSelector(
  [selectFilteredTodos],
  (todos) => [...todos].sort((a, b) => +!!b.pinned - +!!a.pinned),
);

// need to rename selectFilteredTodos
export const selectSearchTodos = createSelector(
  [selectSortedTodos, selectSearchQuery],
  (todos, query) => {
    const q = query.trim().toLowerCase();
    if (!q) return todos;

    const exact = todos.filter((todo) => todo.title.toLowerCase() === q);
    if (exact.length) return exact;

    return todos.filter((todo) =>
      todo.title.toLowerCase().startsWith(query.toLowerCase()),
    );
  },
);
// need to parametrized selector
export const selectSuggestions = (query: string) =>
  createSelector([selectSortedTodos], (todos) => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    const starts = todos.filter((todo) =>
      todo.title.toLowerCase().startsWith(q),
    );
    if (starts.length) return starts.slice(0, 10);
    return todos
      .filter((todo) => todo.title.toLowerCase().includes(q))
      .slice(0, 10);
  });

export const selectTodoLimitExceeded = createSelector(
  [selectSortedTodos],
  (todos) => {
    return todos.filter((todo) => todo.pinned).length >= 3;
  },
);

export const selectHasCompleted = createSelector([selectTodos], (todos) => {
  return todos.some((todo) => todo.completed);
});
