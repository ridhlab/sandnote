import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import "./style.css";

// Mui Material
import { Box, Button, Typography, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// React Router
import { Navigate, useNavigate } from "react-router-dom";

// Compponents
import LayoutMain from "../../Components/Layout/Main";

// Context
import { useAuth } from "../../context/AuthContext";
import { useMd } from "../../context/MdContext";

// Store
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser, ResetUpdate } from "../../service/redux/action";

// Icon
import { AiOutlineEdit } from "react-icons/ai";

// Library
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        vertical: "bottom",
        horizontal: "right",
    });

    const { open, vertical, horizontal } = snackbar;

    const { currentUser, isLogin, isLoadingAuth } = useAuth();

    const { titleValue, bodyText, handleChangeTitle, handleChangeBodyText, resetMd } = useMd();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { GetUserResult, GetUserLoading, GetUserError, UpdateUserResult, UpdateUserLoading, UpdateUserError } = useSelector((state) => state.user);

    const { uid, notes } = GetUserResult;

    const handleSubmitTitle = (e) => {
        e.preventDefault();
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    };

    const handleClickAddNotes = (title, bodyText) => {
        console.log(notes);
        console.log(bodyText, title);
        if (bodyText !== "") {
            const newNote = {
                title,
                bodyText,
                timestamp: Date.now(),
                bgColor: "#FFF",
            };
            const updatedData = {
                ...GetUserResult,
                notes: [...notes, newNote],
            };
            console.log(updatedData);
            dispatch(UpdateUser(uid, updatedData));
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    useEffect(() => {
        if (UpdateUserResult) {
            setSnackbar((prevState) => ({
                ...prevState,
                open: true,
            }));
            resetMd();
            dispatch(ResetUpdate());
        }
    }, [UpdateUserResult]);

    console.log("currentUser", currentUser);
    console.log("titleValue", titleValue);
    console.log("bodyText", bodyText);

    console.log("GetUserResult", GetUserResult);
    console.log("GetUserLoading", GetUserLoading);
    console.log("GetUserError", GetUserError);

    console.log("UpdateUserResult", UpdateUserResult);

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
                <Button variant="contained" sx={{ textTransform: "none" }} fullWidth onClick={() => handleClickAddNotes(titleValue, bodyText)}>
                    Add Notes
                </Button>
                <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        Notes Added
                    </Alert>
                </Snackbar>
            </Box>
        </LayoutMain>
    );
};

export default Dashboard;
