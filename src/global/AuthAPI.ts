import { IUser } from "../types/Interfaces";
import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://testtourapp.herokuapp.com";
export const AuthAPI = createApi({
    reducerPath: "AuthAPI",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        login: builder.mutation<IUser, IUser>({
            query: (payload) => {
                return {
                    url: "/users/signin",
                    method: "POST",
                    body: payload
                }
            }
        })
    }),
});




