import { configureStore } from '@reduxjs/toolkit';
import adReducer from '../adSettings/adSlice';

const store = configureStore({
  reducer: {
    ads: adReducer,
  },
});

export default store;