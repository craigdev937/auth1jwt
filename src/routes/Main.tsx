import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "../pages/Auth";
import { Dashboard } from "../pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../global/Hooks";
import { setUser } from "../global/AuthSlice";

export const Main = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    React.useEffect(() => {
        dispatch(setUser(user));
    }, [dispatch]);

    return (
        <BrowserRouter>
            <React.Fragment>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" replace />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </React.Fragment>
        </BrowserRouter>
    );
};


