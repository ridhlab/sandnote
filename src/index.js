import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// React Router
import { BrowserRouter } from "react-router-dom";

// Theme
import { ThemeProvider } from "@mui/material";
import theme from "./themes/config";

// Provider Context
import { AuthContextProvider } from "./context/AuthContext";
import { MdContextProvider } from "./context/MdContext";

// Redux
import { Provider } from "react-redux";

// Store
import store from "./service/redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AuthContextProvider>
                    <MdContextProvider>
                        <ThemeProvider theme={theme}>
                            <App />
                        </ThemeProvider>
                    </MdContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
