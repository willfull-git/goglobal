import {
  configureStore
} from '@reduxjs/toolkit'

import sliceNades    from './slices/nades';
import sliceSettings from './slices/settings';
import sliceMap      from './slices/map';

export default configureStore({
  reducer: {
    map:      sliceMap,
    settings: sliceSettings,
    nades:    sliceNades,
  },
})
