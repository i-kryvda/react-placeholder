import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "@toolkit/app/store/counter";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// export type RootState = ReturnType<typeof rootReducer>; // for combineReducers

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
