import {
  createSlice
} from '@reduxjs/toolkit';
import dataMaps from '../dataMaps.js';

export const sliceMap = createSlice({
  name: 'map',
  initialState: {
  },
  reducers: {
    setMap: (state, action)=>{
      dataMaps.forEach((v, i)=>{
        if(v.name===action.payload){
          state.name  = v.name;
          state.x     = v.x;
          state.y     = v.y;
          state.scale = v.scale;
        }
      });
    }
  }
});

export const {
  setMap
} = sliceMap.actions;

export default sliceMap.reducer;
