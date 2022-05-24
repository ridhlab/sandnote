import React from "react";

// React Router
import { Navigate } from "react-router-dom";

// Context
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { currentUser, isLoadingAuth } = useAuth();

    if (currentUser === null && !isLoadingAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
