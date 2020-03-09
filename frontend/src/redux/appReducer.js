import ActionType from "./actions";

const initialState = {
    apiError: false,
    authError: false,
    error: '',
    errorMessage: '',
    pendingRequests:0,
    lang: 'en'
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
        case ActionType.AUTH_ERROR + ActionType.FULFILLED:
            return {
                ...state,
                errorMessage: action.payload.message,
                error: action.payload.error,
                authError: true
            };
        case ActionType.API_ERROR + ActionType.FULFILLED:
            return {
                ...state,
                errorMessage: JSON.stringify(action.payload),
                error: action.payload.error,
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
        case ActionType.CHANGE_LANG:
            return {
                ...state,
                lang: action.payload
            };
        default:
            return state
    }
};

export default appReducer;
