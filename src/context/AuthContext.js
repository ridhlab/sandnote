import React, { createContext, useContext, useEffect, useState } from "react";

// Firebase
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../service/firebase/init";

// Store
import { useDispatch } from "react-redux";
import { GetUser } from "../service/redux/action";

const AuthContext = createContext({
    currentUser: null,
    signInWithGoogle: () => Promise,
    logout: () => Promise,
    isLogin: Boolean,
    isLoadingAuth: Boolean,
});

const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [isLogin, setIsLogin] = useState(false);

    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoadingAuth(false);
            setCurrentUser(user);
            if (user !== null) {
                setIsLogin(true);
                dispatch(GetUser(user.uid));
            }
        });
    }, []);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        setIsLogin(false);
        return signOut(auth);
    };

    const value = {
        currentUser,
        signInWithGoogle,
        logout,
        isLogin,
        isLoadingAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthContextProvider };
