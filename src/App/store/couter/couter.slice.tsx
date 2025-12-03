import { createSlice } from "@reduxjs/toolkit";
import { multiplyAction } from "./couter.actions";

type CouterState = {
  value: number;
};

const initialState: CouterState = {
  value: 0,
};

export const couterSlice = createSlice({
  name: "couter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(multiplyAction, (state, action) => {
      state.value *= action.payload;
    });
  },
});

export const { increment, decrement, reset } = couterSlice.actions;
export default couterSlice.reducer;
