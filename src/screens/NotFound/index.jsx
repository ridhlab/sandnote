import React from "react";

// MUI
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Components
import LayoutMain from "../../Components/Layout/Main";

// React Router
import { Link } from "react-router-dom";

// Context
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../Components/Navbar";

const LinkRoute = styled(Link)`
    color: #5af1a6;
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const NotFoundMessage = React.memo(() => {
    const { isLogin } = useAuth();

    return (
        <Box height={isLogin ? "75vh" : "100vh"} display="flex" alignItems="center" justifyContent="center">
            <Box>
                <Typography variant="h5" textAlign="center">
                    404 | Not Found
                </Typography>
                <Typography textAlign="center">
                    Back to <LinkRoute to={isLogin ? "/dashboard" : "/"}>{isLogin ? "Dashboard" : "Home"}</LinkRoute>
                </Typography>
            </Box>
        </Box>
    );
});

const PageNotFound = () => {
    const { isLogin, isLoadingAuth } = useAuth();

    console.log(isLogin);
    if (isLogin) {
        return <LayoutMain>{!isLoadingAuth && <NotFoundMessage />}</LayoutMain>;
    }
    return (
        <>
            {!isLoadingAuth && (
                <>
                    <Navbar />
                    <NotFoundMessage />
                </>
            )}
        </>
    );
};

export { PageNotFound, NotFoundMessage };
