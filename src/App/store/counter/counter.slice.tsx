import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CounterStateType = {
  value: number;
};

const initialState: CounterStateType = { value: 0 };

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => ({
      ...state,
      value: state.value + 1,
    }),
    decrement: (state) => ({
      ...state,
      value: state.value - 1,
    }),
    incrementByAmount: (state, action: PayloadAction<number>) => ({
      ...state,
      value: state.value + action.payload,
    }),
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
