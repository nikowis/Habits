import ActionType from "./actions";

const initialState = {
    apiError: false,
    authError: false,
    pendingRequests:0
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.HTTP_REQUEST_START:
            return {
                ...state,
                pendingRequests: state.pendingRequests + 1
            };
        case ActionType.HTTP_REQUEST_FINISH:
            return {
                ...state,
                pendingRequests: state.pendingRequests - 1
            };
        case ActionType.AUTH_ERROR:
            return {
                ...state,
                authError: true
            };
        case ActionType.API_ERROR:
            return {
                ...state,
                apiError: true
            };
        case ActionType.LOGIN_ACTION + ActionType.FULFILLED:
            return {
                ...state,
                authError: false
            };
        case ActionType.LOGOUT_ACTION + ActionType.FULFILLED:
            return {
                ...state,
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