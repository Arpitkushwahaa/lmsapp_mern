import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RAZORPAY_API } from "../../config/apiConfig";

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
