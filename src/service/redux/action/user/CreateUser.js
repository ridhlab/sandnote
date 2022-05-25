import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/init";
import { CREATE_USER } from "../types";

const CreateUser = (data) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_USER, payload: { loading: true, data: false, errorMessage: false } });
        try {
            await setDoc(doc(db, "users", data.uid), data);
            dispatch({ type: CREATE_USER, payload: { loading: false, data: true, errorMessage: false } });
        } catch (err) {
            dispatch({ type: CREATE_USER, payload: { loading: false, data: false, errorMessage: err.message } });
        }
    };
};

export { CreateUser };
