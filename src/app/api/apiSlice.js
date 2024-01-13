import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://assign-task-api.cyclic.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;

    // adding authorization token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers;
  }
})

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // send refresh token to get new access token
  if (result?.error?.status === 403) {
    console.log('sending refresh token');

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    // success get refresh token
    if (refreshResult?.data) {
      console.log(refreshResult.data)
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }))

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions)

      // failed to get refresh token
    } else {
      const token = api.getState().auth.token;
      if (token && refreshResult?.error?.status === 401) {
        refreshResult.error.data.message = 'Your login has expired. '
      }
      return refreshResult;
    }
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['User', 'Note'],
  endpoints: () => ({}),
})