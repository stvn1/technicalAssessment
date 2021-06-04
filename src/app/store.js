import { configureStore } from '@reduxjs/toolkit'


//slices
import userSlice from '../reducers/userSlice'
import dataSlice from '../reducers/dataSlice'

export default configureStore({
  reducer: {
    user:userSlice,
    data:dataSlice
  }
})