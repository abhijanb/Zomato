import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_CONSTANTS from "../constants/api.constant";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: "include",
    }),
    endpoints: (builder) => {
        return {
            registerRestaurant: builder.mutation({
                query: (data) => ({
                    url: API_CONSTANTS.Restaurant.register,
                    method: "POST",
                    body: data, 
                }),
            }),
            loginRestaurant: builder.mutation({
                query: (data) => ({
                    url: API_CONSTANTS.Restaurant.login,
                    method: "POST",
                    body: data,
                }),
            }),
        };
    },
});

export const { useRegisterRestaurantMutation, useLoginRestaurantMutation } = authApi;
export default authApi;