import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, AuthState } from "../types/Interfaces";

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
            action: PayloadAction<IAuth>
        ) => {
            localStorage.setItem("user", JSON.stringify({
                name: action.payload.name,
                token: action.payload.token
            }));
            state.name = action.payload.name,
            state.token = action.payload.token
        },
        logout: (state: AuthState) => {
            localStorage.clear();
            state.name = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;



