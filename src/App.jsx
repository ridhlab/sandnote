import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import LandingPage from "./screens/LandingPage";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default App;
