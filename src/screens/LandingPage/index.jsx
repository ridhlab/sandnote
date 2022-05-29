import React from "react";
import styles from "./style.module.css";

// Mui Material
import { Box, Button, Typography } from "@mui/material";

// Illustration
import SandNoteIllustration from "../../assets/svg/sandnote-landing-page.svg";

// Components
import Navbar from "../../Components/Navbar";

// Img
import GoogleLogo from "../../assets/logo/google-logo.png";

// React Router
import { useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../context/AuthContext";

// Redux
import { useDispatch } from "react-redux";
import { CheckUser } from "../../service/redux/action";
import Footer from "../../Components/Footer";

const LandingPage = () => {
    const { signInWithGoogle, isLogin, isLoadingAuth } = useAuth();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClickSignInWithGoogle = () => {
        signInWithGoogle()
            .then(async (user) => {
                const { user: userData } = user;
                const { uid, displayName, email, emailVerified, isAnonymous, photoURL, accessToken } = userData;
                localStorage.setItem("user", JSON.stringify({ token: accessToken }));
                dispatch(
                    CheckUser(uid, {
                        uid,
                        displayName,
                        email,
                        emailVerified,
                        isAnonymous,
                        photoURL,
                        notes: [],
                    })
                );

                navigate("/dashboard");
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <Box>
            <Navbar />
            {!isLoadingAuth && (
                <Box mt={14} mb={6}>
                    <Box my={{ xs: 20, md: 2 }}>
                        <Box my={4} width={{ xs: 250, md: 500 }} margin="auto">
                            <img src={SandNoteIllustration} alt="sandnote-hero" className={styles.img} />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Button
                            sx={{
                                textTransform: "none",
                                fontWeight: 1000,
                                bgcolor: "primary.main",
                                color: "white",
                                px: 2,
                                borderRadius: 50,
                                ":hover": { bgcolor: "primary.dark" },
                            }}
                            onClick={() => (isLogin ? navigate("/dashboard") : handleClickSignInWithGoogle())}
                        >
                            {isLogin ? (
                                <>Go to Dashboard</>
                            ) : (
                                <>
                                    <img src={GoogleLogo} alt="google-logo" width={32} />
                                    <Typography mx={2} fontWeight={1000}>
                                        Sign In
                                    </Typography>
                                </>
                            )}
                        </Button>
                    </Box>
                </Box>
            )}
            <Footer />
        </Box>
    );
};

export default LandingPage;
