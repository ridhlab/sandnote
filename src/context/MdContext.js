import React, { createContext, useContext, useState } from "react";

const MdContext = createContext({
    title: String,
    titleValue: String,
    bodyText: String,
    handleChangeTitle: Function,
    handleChangeBodyText: Function,
    resetMd: Function,
});

const useMd = () => useContext(MdContext);

const MdContextProvider = ({ children }) => {
    const [titleValue, setTitleValue] = useState("Untitled");

    const [bodyText, setBodyText] = useState("");

    const handleChangeTitle = (value) => {
        setTitleValue(value);
    };

    const handleChangeBodyText = (value) => {
        setBodyText(value);
    };

    const resetMd = () => {
        setTitleValue("Untitled");
        setBodyText("");
    };

    const value = {
        titleValue,
        bodyText,
        handleChangeTitle,
        handleChangeBodyText,
        resetMd,
    };

    return <MdContext.Provider value={value}>{children}</MdContext.Provider>;
};

export { useMd, MdContextProvider };
