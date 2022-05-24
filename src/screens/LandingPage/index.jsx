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
import { Navigate, useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../context/AuthContext";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { CreateUser } from "../../service/redux/action/auth/CreateUser";

const LandingPage = () => {
    const { signInWithGoogle, currentUser, isLogin, isLoadingAuth } = useAuth();

    const dispatch = useDispatch();

    const { authData, authLoading, authError } = useSelector((state) => state.auth);

    console.log("authData", authData);
    console.log("authLoading", authLoading);
    console.log("authError", authError);

    const navigate = useNavigate();

    const handleClickSignInWithGoogle = () => {
        signInWithGoogle()
            .then(async (user) => {
                const { user: userData } = user;
                const { uid, displayName, email, emailVerified, isAnonymous, photoURL, accessToken } = userData;
                localStorage.setItem("user", JSON.stringify({ token: accessToken }));

                dispatch(
                    CreateUser({
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
                <Box mt={14}>
                    <Box my={8}>
                        <img src={SandNoteIllustration} alt="sandnote-hero" width={500} className={styles.img} />
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
        </Box>
    );
};

export default LandingPage;
