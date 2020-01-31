import ActionType from "./actions/actions";

const initialState = {
    id: '',
    login:''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LOGIN_ACTION:
            return {
                ...state,
                id: action.id,
                login: action.login,
            };
        default:
            return state
    }
};

export default userReducer;
