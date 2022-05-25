import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/init";
import { CHECK_USER } from "../types";
import { CreateUser } from "../";

const ResetCheckUser = () => {
    return {
        type: CHECK_USER,
        payload: { loading: false, data: false, error: false },
    };
};

const CheckUser = (uid, data) => {
    return async (dispatch) => {
        dispatch({ type: CHECK_USER, payload: { loading: true, data: false, error: false } });
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                dispatch(CreateUser(data));
            }
        } catch (error) {
            dispatch({ type: CHECK_USER, payload: { loading: false, data: false, error: error.message } });
        }
    };
};

export { CheckUser, ResetCheckUser };
