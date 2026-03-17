import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";


type ThemeMode = 'light' | 'dark';

type ThemeState = {
    mode: ThemeMode
}

const initialState: ThemeState = {
    mode: 'dark',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        // setTime потрібен на той випадок, якщо треба буде задати тему вручну setTheme('system')
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        }
    }
})

export const {toggleTheme, setTheme} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

