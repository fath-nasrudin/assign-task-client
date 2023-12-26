import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  tagTypes: ['User', 'Note'],
  endpoints: () => ({}),
})