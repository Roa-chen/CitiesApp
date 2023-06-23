import CitiesSlice from './CitiesSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    cities: CitiesSlice
  }
})
