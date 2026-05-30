import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "./store";

// Iнкапсуляція
// Перевикористання
// Складна лоіка

export const selectCounter = (state: AppState) => state.counter.value;

export const selectDoubleCounter = createSelector(
  [selectCounter],
  (counter) => counter * 2,
);

// export const selectDoubleCounter = createSelector(
//   (state: AppState) => state.counter.value,
//   (counter) => counter * 2,
// );

// export const selectActiveTodos = createSelector(
//   (state) => state.todos.items,
//   (items) => items.filter(todo => !todo.completed)
// );
