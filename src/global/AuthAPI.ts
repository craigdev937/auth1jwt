import { IAuth, AuthState } from "../types/Interfaces";
import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://testtourapp.herokuapp.com";
export const AuthAPI = createApi({
    reducerPath: "AuthAPI",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload: {
                email: string, 
                password: string
            }) => {
                return {
                    url: "/users/signin",
                    method: "POST",
                    body: payload
                }
            }
        }),
        register: builder.mutation({
            query: (payload: {
                firstName: string,
                lastName: string,
                email: string,
                password: string,
                confirmPassword: string
            }) => {
                return {
                    url: "/users/signup",
                    method: "POST",
                    body: payload
                }
            },
        }),
    }),
});




