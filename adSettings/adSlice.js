import { createSlice } from '@reduxjs/toolkit';

const adSlice = createSlice({
  name: 'ads',
  initialState: {
    ads: [],
    visibleUsers: [], 
  },
  reducers: {
    addAdAction: (state, action) => {
      state.ads = [...state.ads, action.payload];
    },
    updateAdAction: (state, action) => {
      const index = state.ads.findIndex((ad) => ad.id === action.payload.id);
      if (index !== -1) {
        state.ads[index] = { ...state.ads[index], ...action.payload };
      }
    },
    deleteAdAction: (state, action) => {
      state.ads = state.ads.filter((ad) => ad.id !== action.payload);
    },
    
    setVisibleUsers: (state, action) => {
      state.visibleUsers = action.payload;
    },
  },
});

export const { addAdAction, updateAdAction, deleteAdAction, setVisibleUsers } = adSlice.actions;
export default adSlice.reducer;