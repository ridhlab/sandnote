import React, { useState, useEffect } from "react";

// MUI
import { Box, Divider, Typography } from "@mui/material";

// Icons
import { AiOutlineRollback } from "react-icons/ai";

// React Router
import { useParams, useNavigate } from "react-router-dom";

// Store
import { useSelector } from "react-redux";

// Components
import LayoutMain from "../../../Components/Layout/Main";

// Library
import ReactMarkdown from "react-markdown";

const NoteDetail = () => {
    const { noteId } = useParams();

    const navigate = useNavigate();

    const [note, setNote] = useState({});

    const { GetUserResult, GetUserLoading } = useSelector((state) => state.user);

    useEffect(() => {
        if (GetUserResult) {
            setNote(GetUserResult.notes[noteId - 1]);
        }
    }, [GetUserResult]);

    return (
        <LayoutMain>
            {GetUserLoading && <Box>Loading...</Box>}
            {GetUserResult && (
                <Box>
                    <Box my={2}>
                        <Box component="span" sx={{ ":hover": { cursor: "pointer" } }} onClick={() => navigate(-1)}>
                            <AiOutlineRollback />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h4">{note.title}</Typography>
                        <Divider />
                        <ReactMarkdown children={note.bodyText} />
                    </Box>
                </Box>
            )}
        </LayoutMain>
    );
};

export default NoteDetail;
