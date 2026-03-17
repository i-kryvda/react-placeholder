import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: 10,
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
            reducer(state, action: PayloadAction<number>) {
                state.value = action.payload;
            },
            prepare() {
                const random = Math.floor(Math.random() * 100);
                return {payload: random};
            },
        },
    },
});

export const {increment, decrement, random} = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
