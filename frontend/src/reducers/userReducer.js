import {LOGIN_ACTION} from "../actions/actions";

const initialState = {
    id: '',
    login:''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
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
