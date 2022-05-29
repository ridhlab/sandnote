import React, { useState, useEffect } from "react";

// MUI
import { Box, Button, Divider, Snackbar, Typography } from "@mui/material";

// Icons
import { AiOutlineRollback } from "react-icons/ai";

// React Router
import { useParams, useNavigate } from "react-router-dom";

// Store
import { useSelector, useDispatch } from "react-redux";
import { UpdateUser, ResetUpdate } from "../../../service/redux/action";

// Components
import LayoutMain from "../../../Components/Layout/Main";
import Sandbox from "../../../Components/Sandbox";
import Alert from "../../../Components/Alert";

// Library
import ReactMarkdown from "react-markdown";
import { NotFoundMessage } from "../../NotFound";

const NoteDetail = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [isNoteIdValid, setIsNoteIdValid] = useState(true);

    const [titleValue, setTitleValue] = useState("");

    const [bodyText, setBodyText] = useState("");

    const [note, setNote] = useState({});

    const [snackbar, setSnackbar] = useState({
        open: false,
        vertical: "bottom",
        horizontal: "right",
    });

    const { open, vertical, horizontal } = snackbar;

    const { noteId } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { GetUserResult, GetUserLoading, UpdateUserResult } = useSelector((state) => state.user);

    const handleClickUpdate = async () => {
        const updatedNote = { ...note, title: titleValue, bodyText, timestamp: Date.now() };
        const updatedNotes = GetUserResult.notes.map((note) => {
            if (note.uid === updatedNote.uid) {
                return updatedNote;
            }
            return note;
        });
        await new Promise((resolve) => {
            resolve(dispatch(UpdateUser(GetUserResult.uid, { ...GetUserResult, notes: updatedNotes })));
        });
        setSnackbar((prevState) => ({
            ...prevState,
            open: true,
        }));
        setIsEdit(false);
        dispatch(ResetUpdate());
    };

    const handleClickDelete = async () => {
        const updateNotes = GetUserResult.notes.filter((note) => {
            return note.uid !== noteId;
        });
        await new Promise((resolve) => {
            resolve(dispatch(UpdateUser(GetUserResult.uid, { ...GetUserResult, notes: updateNotes })));
        });
        navigate("/notes");
    };

    const handleClickCancel = () => {
        setIsEdit(false);
        setTitleValue(note.title);
        setBodyText(note.bodyText);
    };

    const handleChangeTitle = (value) => {
        setTitleValue(value);
    };

    const handleChangeBodyText = (value) => {
        setBodyText(value);
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

    console.log(isNoteIdValid);
    useEffect(() => {
        if (GetUserResult) {
            const { notes } = GetUserResult;
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].uid === noteId) {
                    setNote(notes[i]);
                    setTitleValue(notes[i].title);
                    setBodyText(notes[i].bodyText);
                    break;
                } else {
                    if (i === notes.length - 1) {
                        setIsNoteIdValid(false);
                    }
                }
            }
        }
    }, [GetUserResult]);

    return (
        <LayoutMain>
            {GetUserLoading && <Box>Loading...</Box>}
            {GetUserResult && (
                <>
                    {isNoteIdValid ? (
                        <>
                            <Box>
                                <Box display="flex" my={2} justifyContent={isEdit ? "flex-end" : "space-between"} alignItems="center">
                                    {!isEdit && (
                                        <Box component="span" sx={{ ":hover": { cursor: "pointer" } }} onClick={() => navigate(-1)}>
                                            <AiOutlineRollback />
                                        </Box>
                                    )}
                                    <Box>
                                        {!isEdit ? (
                                            <>
                                                <Button variant="outlined" sx={{ mx: 1 }} color="info" onClick={() => setIsEdit(true)}>
                                                    Edit
                                                </Button>
                                                <Button variant="outlined" sx={{ mx: 1 }} color="warning" onClick={() => handleClickDelete()}>
                                                    Delete
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="outlined" color="warning" sx={{ mx: 1 }} onClick={() => handleClickCancel()}>
                                                    Cancel
                                                </Button>
                                                <Button variant="outlined" color="info" sx={{ mx: 1 }} onClick={() => handleClickUpdate()}>
                                                    Update
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                </Box>
                                <Box>
                                    {!isEdit ? (
                                        <>
                                            <Typography variant="h4">{note.title}</Typography>
                                            <Divider />
                                            <ReactMarkdown children={note.bodyText} />
                                        </>
                                    ) : (
                                        <Sandbox
                                            titleValue={titleValue}
                                            bodyText={bodyText}
                                            handleChangeTitle={handleChangeTitle}
                                            handleChangeBodyText={handleChangeBodyText}
                                        />
                                    )}
                                </Box>
                            </Box>
                            <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                                    Note Edited
                                </Alert>
                            </Snackbar>
                        </>
                    ) : (
                        <NotFoundMessage />
                    )}
                </>
            )}
        </LayoutMain>
    );
};

export default NoteDetail;
