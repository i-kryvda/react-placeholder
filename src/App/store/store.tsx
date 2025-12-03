import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import postsSlice from "./posts/posts.slice";
import couterSlice from "./couter/couter.slice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    counter: couterSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
