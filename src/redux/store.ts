import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    userReducer,
    authReducer
  }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;