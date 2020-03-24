import {CREATE_HABIT, FETCH_HABITS, FULFILLED, LOGOUT_ACTION, PENDING} from "./actions";

const initialState = {
    content: null,
    loading: false,
    currentPage: null,
    totalPages: null,
};

const habitsReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_HABITS + PENDING:
            return {
                ...state,
                loading: true
            };
        case FETCH_HABITS + FULFILLED:
            return {
                content: payload.content,
                loading: false,
                currentPage: payload.number,
                totalPages: payload.totalPages,
            };
        case LOGOUT_ACTION + PENDING:
        case CREATE_HABIT:
            return initialState;
        default:
            return state
    }
};

export default habitsReducer;

