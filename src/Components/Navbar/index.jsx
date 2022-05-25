import React, { useState } from "react";

// Mui Material
import { Box, IconButton, Toolbar, AppBar } from "@mui/material";

// React Router
import { Link, useLocation } from "react-router-dom";

// Components
import Logo from "../Logo";

// Context
import { useAuth } from "../../context/AuthContext";

// Icons
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
    const { isLogin, isLoadingAuth } = useAuth();

    const location = useLocation();

    return (
        <AppBar
            position="fixed"
            sx={{
                width: () => (isLogin ? { sm: `calc(100% - ${drawerWidth}px)` } : "100%"),
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                    {isLogin && location.pathname !== "/" && (
                        <IconButton
                            onClick={() => handleDrawerToggle()}
                            sx={{ mr: 2, display: { sm: "none" } }}
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                        >
                            <HiMenuAlt2 color="white" />
                        </IconButton>
                    )}
                    {!isLoadingAuth && (
                        <Link to={isLogin ? "/dashboard" : "/"}>
                            <Logo />
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
