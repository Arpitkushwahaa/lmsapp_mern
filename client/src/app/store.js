import {configureStore} from "@reduxjs/toolkit" 
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { razorpayApi } from "@/features/api/razorpayApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

export const appStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [purchaseApi.reducerPath]: purchaseApi.reducer,
        [razorpayApi.reducerPath]: razorpayApi.reducer,
        [courseProgressApi.reducerPath]: courseProgressApi.reducer,
        auth: authReducer,
    },
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, razorpayApi.middleware, courseProgressApi.middleware)
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();