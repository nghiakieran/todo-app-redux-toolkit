// src/store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('themeMode') || 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('themeMode', state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectThemeMode = (state) => state.theme.mode;

export default themeSlice.reducer;