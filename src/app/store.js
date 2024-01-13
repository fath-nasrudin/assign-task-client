import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from "./api/apiSlice";
import authSlice from "../features/auth/authSlice";

const devTools = process.env.NODE_ENV !== 'production'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools,
})

setupListeners(store.dispatch)
