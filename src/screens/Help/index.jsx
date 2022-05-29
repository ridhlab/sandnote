import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

// MUI
import { Box } from "@mui/material";

// Components
import LayoutMain from "../../Components/Layout/Main";

// Library
import Markdown from "markdown-to-jsx";

import MdHelp from "../../data/markdown-cheat-sheet.md";

const Help = () => {
    const [mdContent, setMdContent] = useState("");

    useEffect(() => {
        fetch(MdHelp)
            .then((res) => res.text())
            .then((md) => setMdContent(md));
    }, []);
    
    return (
        <LayoutMain>
            <Box display={{ xs: "block", md: "flex" }} pb={8}>
                <Box width={{ sm: "100%", md: "50%" }} px={2} height={{ xs: 320, md: "auto" }}>
                    <textarea value={mdContent} className={styles.editorInput} readOnly />
                </Box>
                <Box width={{ sm: "100%", md: "50%" }} px={2}>
                    <Markdown>{mdContent}</Markdown>
                </Box>
            </Box>
        </LayoutMain>
    );
};

export default Help;
