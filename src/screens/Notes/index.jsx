import React, { useEffect, useState } from "react";

// MUI
import { Box, Typography, Grid, Button } from "@mui/material";

// React Router
import { useNavigate } from "react-router-dom";

// Components
import LayoutMain from "../../Components/Layout/Main";

// Store
import { useSelector } from "react-redux";

const Notes = () => {
    const { GetUserResult, GetUserLoading } = useSelector((state) => state.user);

    const navigate = useNavigate();

    const { notes } = GetUserResult;

    const [sortedNotes, setSortedNotes] = useState([]);

    useEffect(() => {
        if (notes !== undefined) {
            setSortedNotes(notes.sort((a, b) => b.timestamp - a.timestamp));
        }
    }, [notes]);

    return (
        <LayoutMain>
            {GetUserLoading && <Box>Loading</Box>}
            {GetUserResult && (
                <>
                    {notes.length === 0 ? (
                        <Box>Notes Empty</Box>
                    ) : (
                        <Grid container spacing={2}>
                            {sortedNotes.map((note, idx) => {
                                const { title, uid } = note;
                                let { bgColor } = note;
                                bgColor = bgColor.toLowerCase();
                                return (
                                    <Grid item key={idx} xs={12} md={4}>
                                        <Box bgcolor={bgColor} p={2} borderRadius={2} boxShadow="5px 6px 15px -11px rgba(0,0,0,0.5)">
                                            <Box height={25} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" width="100%">
                                                <Typography>{title}</Typography>
                                            </Box>
                                            <Button variant="outlined" onClick={() => navigate(`/notes/${uid}`)}>
                                                See Note
                                            </Button>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </>
            )}
        </LayoutMain>
    );
};

export default Notes;
