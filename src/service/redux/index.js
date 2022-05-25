import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer, noteReducer } from "./reducer/";

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
