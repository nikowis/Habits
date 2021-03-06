import {CREATE_HABIT, DELETE_HABIT, FETCH_HABITS, FULFILLED, LOGOUT_ACTION, PENDING} from "./actions";

const initialState = {
    content: null,
    loading: false,
    currentPage: null,
    totalPages: null,
    totalElements: null
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
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
            };
        case LOGOUT_ACTION + PENDING:
        case CREATE_HABIT:
        case DELETE_HABIT + FULFILLED:
            return initialState;
        default:
            return state
    }
};

export default habitsReducer;

