import React from "react";
import { useAppSelector } from "../global/Hooks";
import { ToRedirect } from "./ToRedirect";

export const PrivateRt = ({children}: any) => {
    const { token } = useAppSelector((state) => state.auth);
    
    return (
        token ? 
        children : 
        <ToRedirect />
    );
};


