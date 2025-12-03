import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@shared/api/api";
import type { PostItem } from "./posts.types";

export const fetchPosts = createAsyncThunk<
  PostItem[], // return type
  void, // argument type
  { rejectValue: string } // thunkAPI type
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const data = await api.getPost();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch posts");
  }
});
