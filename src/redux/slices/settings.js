import {
  createSlice
} from '@reduxjs/toolkit';

export const sliceSettings = createSlice({
  name: 'settings',
  initialState: {
    filters: {
      type: null,
      position: null
    },
  },
  reducers: {
    setNadeType: (state, action)=>{
      state.filters.type = action.payload;
    },
    clearAll: (state, action)=>{
      state.filters = {};
    }
  },
})

export const {
  setNadeType, clearAll
} = sliceSettings.actions;

export default sliceSettings.reducer;
