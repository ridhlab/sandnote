import React from "react";

// Mui Material
import { Box, Button, Typography } from "@mui/material";

// React Router
import { Navigate } from "react-router-dom";

// Compponents
import LayoutMain from "../../Components/Layout/Main";
import Navbar from "../../Components/Navbar";

// Context
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
    const { currentUser, isLogin, isLoadingAuth } = useAuth();
    return (
        <LayoutMain>
            <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem voluptates incidunt error voluptas maiores. Exercitationem, temporibus
                ipsam aperiam similique et dolor, ipsum, incidunt perferendis pariatur hic accusamus? Quaerat, illo itaque.
            </Typography>
        </LayoutMain>
    );
};

export default Dashboard;
