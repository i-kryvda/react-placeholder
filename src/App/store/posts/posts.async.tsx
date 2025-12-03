import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PostItem } from "./posts.types";

export const fetchPosts = createAsyncThunk<
  PostItem[], // return type
  void, // argument type
  { rejectValue: string } // thunkAPI type
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) return rejectWithValue("Network response was not ok");
    const data: PostItem[] = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Failed to fetch posts");
  }
});
