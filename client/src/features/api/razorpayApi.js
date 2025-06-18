import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const RAZORPAY_API = 'http://localhost:8080/api/v1/payment';

export const razorpayApi = createApi({
  reducerPath: 'razorpayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: RAZORPAY_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (amount) => ({
        url: '/order',
        method: 'POST',
        body: { amount },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = razorpayApi;
