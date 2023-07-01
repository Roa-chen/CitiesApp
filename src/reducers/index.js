import React from 'react';
import CitiesSlice from './CitiesSlice';
import { configureStore } from '@reduxjs/toolkit';
import ThemeSlice from './ThemeSlice';

export default configureStore({
  reducer: {
    cities: CitiesSlice,
    theme: ThemeSlice,
  }
})
