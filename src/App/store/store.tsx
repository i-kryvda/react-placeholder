import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter/counter.slice";
import { useSelector, useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
