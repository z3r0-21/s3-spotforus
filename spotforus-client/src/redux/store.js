import { configureStore } from '@reduxjs/toolkit'
import userRedcuer from './userSlice'

export const store = configureStore({
  reducer: {
    user: userRedcuer,
  },
})