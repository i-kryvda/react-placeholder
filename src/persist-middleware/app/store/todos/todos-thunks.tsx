import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodos } from "@persist-middleware/shared/api/todos-api.tsx";
import type { TodoType } from "@persist-middleware/app/store/todos/todos-types.tsx";

export const todosThunks = createAsyncThunk<
  TodoType[],
  void,
  { rejectValue: string }
>("todos", async (_, { rejectWithValue }) => {
  try {
    return await fetchTodos();
  } catch (error) {
    if (error instanceof Error) rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});
