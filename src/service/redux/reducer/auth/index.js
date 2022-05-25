import { CREATE_USER, GET_USER } from "../../action/types";

const initState = {
    CreateUserResult: false,
    CreateUserLoading: false,
    CreateUserError: false,

    GetUserResult: false,
    GetUserLoading: false,
    GetUserError: false,
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
        case GET_USER:
            return {
                ...state,
                GetUserResult: action.payload.data,
                GetUserLoading: action.payload.loading,
                GetUserError: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default authReducer;
