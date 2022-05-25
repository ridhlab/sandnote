import { GET_USER } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/init";

const GetUser = (uid) => {
    return async (dispatch) => {
        dispatch({ type: GET_USER, payload: { loading: true, data: false, errorMessage: false } });
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                dispatch({ type: GET_USER, payload: { loading: false, data: docSnap.data(), errorMessage: false } });
            }
        } catch (err) {
            dispatch({ type: GET_USER, payload: { loading: false, data: false, errorMessage: err.message } });
        }
    };
};

export default GetUser;
