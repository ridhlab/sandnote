import React from "react";
import styles from "./style.module.css";

// MUI
import { Box, TextField, Typography } from "@mui/material";

// Context
import { useMd } from "../../context/MdContext";

// Library
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Sandbox = React.memo(({ titleValue, bodyText, handleChangeTitle, handleChangeBodyText }) => {
    const handleSubmitTitle = (e) => {
        e.preventDefault();
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    };

    return (
        <>
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
                <Box width={{ sm: "100%", md: "50%" }} px={2} height={{ xs: 450, md: "100%" }}>
                    <Typography variant="h6">Preview</Typography>
                    <Box className={styles.wrapperMdPreview} height="100%">
                        <ReactMarkdown children={bodyText} remarkPlugins={[remarkGfm]} />
                    </Box>
                </Box>
            </Box>
        </>
    );
});

export default Sandbox;
