import React, { useEffect, useState } from "react";

// Mui Material
import { Box, Button, Typography, TextField, Snackbar } from "@mui/material";

// React Router
import { Navigate, useNavigate } from "react-router-dom";

// Compponents
import LayoutMain from "../../Components/Layout/Main";
import Sandbox from "../../Components/Sandbox";
import Alert from "../../Components/Alert";

// Context
import { useAuth } from "../../context/AuthContext";
import { useMd } from "../../context/MdContext";

// Store
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser, ResetUpdate } from "../../service/redux/action";

const Dashboard = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        vertical: "bottom",
        horizontal: "right",
    });

    const { open, vertical, horizontal } = snackbar;

    const { titleValue, bodyText, handleChangeTitle, handleChangeBodyText, resetMd } = useMd();

    const dispatch = useDispatch();

    const { GetUserResult, GetUserLoading, GetUserError, UpdateUserResult, UpdateUserLoading, UpdateUserError } = useSelector((state) => state.user);

    const { uid, notes } = GetUserResult;

    const handleClickAddNotes = (title, bodyText) => {
        if (bodyText !== "") {
            const newNote = {
                title,
                bodyText,
                timestamp: Date.now(),
                bgColor: "#FFF",
                uid: btoa(Date.now().toString()),
            };
            const updatedData = {
                ...GetUserResult,
                notes: notes.length === 0 ? [newNote] : [...notes, newNote],
            };
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

    return (
        <LayoutMain>
            <Box pb={6}>
                <Sandbox titleValue={titleValue} bodyText={bodyText} handleChangeTitle={handleChangeTitle} handleChangeBodyText={handleChangeBodyText} />
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
