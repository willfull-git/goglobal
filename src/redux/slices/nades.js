import {
  createSlice
} from '@reduxjs/toolkit';
import dataNades from '../dataNades.js';

export const sliceNades = createSlice({
  name: 'nades',
  initialState: {
    list: dataNades
  },
  reducers: {
    addNade: (state, action) => {
      state.nades.list.push(action.payload);
    },
    removeNade: (state, action) => {
    },
  },
})

export const {
} = sliceNades.actions;

export default sliceNades.reducer;
