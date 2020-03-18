import ActionType from "./actions";

const initialState = {
    id: '',
    login: '',
    authenticated: false,
    streakGoal: null
};

const userReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case ActionType.LOGIN_ACTION + ActionType.FULFILLED:
            return {
                ...state,
                id: payload.id,
                login: payload.login,
                authenticated: true
            };
        case ActionType.FETCH_USER + ActionType.FULFILLED:
            return {
                ...state,
                id: payload.id,
                login: payload.login,
                streakGoal: payload.streakGoal
            };
        case ActionType.AUTH_ERROR + ActionType.FULFILLED:
        case ActionType.LOGOUT_ACTION + ActionType.PENDING:
            return initialState;
        default:
            return state
    }
};

export default userReducer;
