import { UPDATE_USER } from "../types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/init";
import { GetUser } from "../index";

const ResetUpdate = () => {
    return {
        type: UPDATE_USER,
        payload: { loading: false, data: false, errorMessage: false },
    };
};

const UpdateUser = (uid, data) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_USER, payload: { loading: true, data: false, errorMessage: false } });
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, data);
            dispatch({ type: UPDATE_USER, payload: { loading: false, data: true, errorMessage: false } });
            dispatch(GetUser(uid));
        } catch (error) {
            dispatch({ type: UPDATE_USER, payload: { loading: false, data: false, errorMessage: error.message } });
        }
    };
};

export { UpdateUser, ResetUpdate };
