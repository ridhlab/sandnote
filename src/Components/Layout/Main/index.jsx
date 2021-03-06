import React, { useState } from "react";

// Mui
import { Box, CssBaseline, Toolbar } from "@mui/material";

// Components
import Navbar from "../../Navbar";
import Footer from "../../Footer";

// Context
import { useAuth } from "../../../context/AuthContext";
import ResponsiveDrawer from "../../Drawer";

const drawerWidth = 240;

const LayoutMain = ({ children }) => {
    const { isLogin, isLoadingAuth } = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Navbar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
                {/* Drawer */}
                {isLogin && (
                    <>
                        <ResponsiveDrawer drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                        {/* Main App */}
                        <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: "100%" }}>
                            <Toolbar />
                            {children}
                        </Box>
                    </>
                )}
            </Box>
            {!isLoadingAuth && <Footer drawerWidth={drawerWidth} />}
        </Box>
    );
};

export default LayoutMain;
