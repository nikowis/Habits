import ActionType from "./actions";

const initialState = {
    id: '',
    login: '',
    authenticated: false
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
        case ActionType.LOGOUT_ACTION + ActionType.FULFILLED:
            return initialState;
        default:
            return state
    }
};

export default userReducer;
