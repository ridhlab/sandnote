import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";

// React Router
import { useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../context/AuthContext";

// Icons
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdOutlineLiveHelp } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const ResponsiveDrawer = ({ drawerWidth, window, mobileOpen, handleDrawerToggle }) => {
    const { logout } = useAuth();

    const navigate = useNavigate();

    const navItems = [
        {
            name: "Sandbox",
            icon: <AiOutlineCodeSandbox size={24} />,
        },
        {
            name: "Notes",
            icon: <CgNotes size={24} />,
        },
        {
            name: "Help",
            icon: <MdOutlineLiveHelp size={24} />,
        },
        {
            name: "Logout",
            icon: <MdLogout size={24} />,
        },
    ];

    const handleLogout = () => {
        logout();
        localStorage.removeItem("user");
        navigate("/");
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleClickNavItem = (name) => {
        if (name === "Logout") {
            handleLogout();
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton onClick={() => handleClickNavItem(item.name)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
