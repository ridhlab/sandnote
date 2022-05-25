import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import firebase from "firebase/app";
import { firebaseReducer, firestoreReducer, getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { authReducer, noteReducer } from "./reducer/";

const rootReducer = combineReducers({
    // firebase: firebaseReducer,
    // firestore: firestoreReducer,
    auth: authReducer,
    // notes: noteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
