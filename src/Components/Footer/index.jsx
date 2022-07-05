import React from "react";

// MUI
import { Box, Link } from "@mui/material";

// Context
import { useAuth } from "../../context/AuthContext";

const Footer = React.memo(({ drawerWidth }) => {
    const { isLogin } = useAuth();

    return (
        <Box position="fixed" bottom="0" left="0" right="0">
            <Box display="flex" justifyContent={{ sm: "flex-end" }}>
                <Box bgcolor="primary.main" py={2} sx={{ width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` } }} textAlign="center" color="white">
                    &copy;{" "}
                    <Link href="https://www.github.com/ridhlab" color="inherit" underline="hover" target="_blank">
                        Muhammad Ridwan
                    </Link>{" "}
                    | 2022
                </Box>
            </Box>
        </Box>
    );
});

export default Footer;
