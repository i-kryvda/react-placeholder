import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  TodosState,
  TodoType,
  FilterType,
} from "@persist-middleware/app/store/todos/todos-types.tsx";
// import { todosThunks } from "@persist-middleware/app/store/todos/todos-thunks.tsx";
// import { setSearchAndFilter } from "@persist-middleware/app/store/todos/todos-actions.tsx";

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: "",
  filter: "active",
  searchQuery: "",
};

const MAX_PINNED = 3;

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: {
      reducer(state, action: PayloadAction<TodoType>) {
        const { title } = action.payload;

        state.todos.unshift({
          ...action.payload,
          title: title.trim(),
        });
      },
      prepare(title: string, description?: string) {
        return {
          payload: {
            id: crypto.randomUUID(),
            title,
            description,
            completed: false,
            pinned: false,
          },
        };
      },
    },

    deleteTodo(state, action: PayloadAction<{ id: string }>) {
      state.todos = state.todos.filter((todo) => todo.id != action.payload.id);
    },

    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },

    updateTodo(
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        description?: string;
      }>,
    ) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (!todo) return;
      todo.title = action.payload.title;
      todo.description = action.payload.description;
    },

    toggleTodo(state, action: PayloadAction<{ id: string }>) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (!todo) return;
      todo.completed = !todo.completed;
      todo.pinned = false;
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      const normalized = action.payload.trim().toLowerCase();
      state.searchQuery = normalized;
    },

    pinTodo(state, action: PayloadAction<{ id: string }>) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (!todo) return;

      const pinnedCount = state.todos.filter((t) => t.pinned).length;
      if (!todo.pinned && pinnedCount >= MAX_PINNED) return;

      todo.pinned = !todo.pinned;
    },

    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },
  },
});

export const todosReducer = TodosSlice.reducer;
export const {
  deleteTodo,
  clearCompleted,
  setSearchQuery,
  createTodo,
  updateTodo,
  toggleTodo,
  pinTodo,
  setFilter,
} = TodosSlice.actions;
