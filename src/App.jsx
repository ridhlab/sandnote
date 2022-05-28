import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import LandingPage from "./screens/LandingPage";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import Help from "./screens/Help";
import Notes from "./screens/Notes";
import NoteDetail from "./screens/Notes/Detail";
import { PageNotFound } from "./screens/NotFound";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/help"
                element={
                    <PrivateRoute>
                        <Help />
                    </PrivateRoute>
                }
            />
            <Route path="/notes">
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <Notes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path=":noteId"
                    element={
                        <PrivateRoute>
                            <NoteDetail />
                        </PrivateRoute>
                    }
                />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;
