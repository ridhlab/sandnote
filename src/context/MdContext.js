import React, { createContext, useContext, useState } from "react";

const MdContext = createContext({
    title: String,
    titleValue: String,
    bodyText: String,
    handleChangeTitle: Function,
    handleChangeBodyText: Function,
    acceptTitleValue: Function,
});

const useMd = () => useContext(MdContext);

const MdContextProvider = ({ children }) => {
    const [title, setTitle] = useState("Untitled");

    const [titleValue, setTitleValue] = useState(title);

    const [bodyText, setBodyText] = useState("");

    const handleChangeTitle = (value) => {
        console.log(value);
        setTitleValue(value);
    };

    const handleChangeBodyText = (value) => {
        setBodyText(value);
    };

    const acceptTitleValue = (value) => {
        setTitle(value);
    };

    const value = {
        title,
        titleValue,
        bodyText,
        handleChangeTitle,
        handleChangeBodyText,
        acceptTitleValue,
    };

    return <MdContext.Provider value={value}>{children}</MdContext.Provider>;
};

export { useMd, MdContextProvider };
