import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./posts.async";
import type { PostItem, PostsState } from "./posts.types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<number>) => ({
      ...state,
      posts: state.posts.filter((post) => post.id !== action.payload),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostItem[]>) => ({
          ...state,
          posts: action.payload.slice(0, 10),
          loading: false,
        })
      )
      .addCase(fetchPosts.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch posts",
      }));
  },
});

export const { removePost } = postsSlice.actions;
export default postsSlice.reducer;
