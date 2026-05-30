import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type State = {
  value: number;
};

const initialState: State = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    random: {
      // reducer() → обробляє action
      reducer(state, action: PayloadAction<number>) {
        state.value = action.payload;
      },
      // prepare() → створює action
      prepare() {
        const random = Math.floor(Math.random() * 100);
        return { payload: random };
      },
    },
  },
});

export const { increment, decrement, random } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
