import { CREATE_USER } from "../../action/types";

const initState = {
    CreateUserResult: false,
    CreateUserLoading: false,
    CreateUserError: false,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                CreateUserResult: action.payload.data,
                CreateUserLoading: action.payload.loading,
                CreateUserError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default authReducer;
