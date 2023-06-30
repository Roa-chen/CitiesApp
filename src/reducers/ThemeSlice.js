import { createSlice } from "@reduxjs/toolkit"

const ThemeSlice = createSlice({
  name: 'cities',
  initialState: {
    darkMode: false
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    }
  }
});

export const {setDarkMode} = ThemeSlice.actions;
export default ThemeSlice.reducer;