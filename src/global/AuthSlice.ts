import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./RootReducer";
import { IUser, AuthState } from "../types/Interfaces";

const initialState: AuthState = {
    name: null,
    token: null
};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (
            state: AuthState, 
            action: PayloadAction<IUser>
        ) => {
            localStorage.setItem("user", JSON.stringify({
                name: action.payload.name,
                token: action.payload.token
            }));
            state.name = action.payload.name,
            state.token = action.payload.token
        },
    },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;



