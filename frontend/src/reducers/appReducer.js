import ActionType from "../actions/actions";

const initialState = {
    apiError: false,
    authError: false,
    authenticated: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
            case ActionType.AUTH_ERROR:
            return {
                ...state,
                authenticated: false,
                authError: true
            };
        case ActionType.API_ERROR:
            return {
                ...state,
                apiError: true
            };
        case ActionType.LOGIN_ACTION:
            return {
                ...state,
                authenticated: true,
                authError: false
            };
        case ActionType.CLEAR_AUTH_ERROR:
            return {
                ...state,
                authError: false
            };
        case ActionType.CLEAR_API_ERROR:
            return {
                ...state,
                apiError: false
            };
        default:
            return state
    }
};

export default appReducer;
