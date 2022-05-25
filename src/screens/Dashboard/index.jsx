import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import "./style.css";

// Mui Material
import { Box, Button, Typography, TextField } from "@mui/material";

// React Router
import { Navigate, useNavigate } from "react-router-dom";

// Compponents
import LayoutMain from "../../Components/Layout/Main";

// Context
import { useAuth } from "../../context/AuthContext";
import { useMd } from "../../context/MdContext";

// Store
import { useDispatch, useSelector } from "react-redux";

// Icon
import { AiOutlineEdit } from "react-icons/ai";

// Library
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Dashboard = () => {
    const { currentUser, isLogin, isLoadingAuth } = useAuth();

    const { title, titleValue, bodyText, handleChangeTitle, handleChangeBodyText, acceptTitleValue } = useMd();

    const { GetUserResult, GetUserLoading, GetUserError } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const handleSubmitTitle = (e) => {
        e.preventDefault();
        acceptTitleValue(titleValue);
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    };

    useEffect(() => {
        // dispatch(GetUser(currentUser.uid));
    }, []);

    console.log("currentUser", currentUser);
    console.log("title", title);
    console.log("titleValue", titleValue);
    console.log("bodyText", bodyText);

    console.log("GetUserResult", GetUserResult);
    console.log("GetUserLoading", GetUserLoading);
    console.log("GetUserError", GetUserError);

    return (
        <LayoutMain>
            <Box>
                <form className={styles.formTitle} onSubmit={handleSubmitTitle}>
                    <TextField
                        InputProps={{ style: { fontSize: 32, fontWeight: 700 } }}
                        autoComplete="off"
                        id="standard-basic"
                        variant="standard"
                        value={titleValue}
                        onChange={(e) => handleChangeTitle(e.target.value)}
                        fullWidth
                        onKeyUp={handleKeyUp}
                    />
                    <button type="submit" style={{ display: "none" }}></button>
                </form>
                <Box display={{ md: "flex" }} my={2} height={{ sm: "auto", md: 500 }}>
                    <Box width={{ sm: "100%", md: "50%" }} px={2} height={{ xs: 320, md: "100%" }}>
                        <Typography variant="h6">Editor</Typography>
                        <textarea
                            value={bodyText}
                            className={styles.editorInput}
                            placeholder="type something and see the magic"
                            onChange={(e) => handleChangeBodyText(e.target.value)}
                        />
                    </Box>
                    <Box width={{ sm: "100%", md: "50%" }} px={2} height={{ xs: "auto", md: "100%" }}>
                        <Typography variant="h6">Preview</Typography>
                        <Box className={styles.wrapperMdPreview}>
                            <ReactMarkdown children={bodyText} remarkPlugins={[remarkGfm]} />
                        </Box>
                    </Box>
                </Box>
                <Button variant="contained" sx={{ textTransform: "none" }} fullWidth>
                    Add Notes
                </Button>
            </Box>
        </LayoutMain>
    );
};

export default Dashboard;
