// import { configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { counterReducer } from "./counter/reducer";
import { usersReducer } from "./users/reducer";

export const rootReducer = combineReducers({
  users: usersReducer,
  counter: counterReducer,
});

// createStore вже lagacy, але для прикладу підійде
export const store = createStore(rootReducer, applyMiddleware(thunk));

// Типізація обов'язково
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
