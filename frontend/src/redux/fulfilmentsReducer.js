import {CREATE_HABIT, FETCH_FULFILMENTS, FULFIL_HABIT, FULFILLED, LOGOUT_ACTION, PENDING} from "./actions";

const initialState = {
    content: null,
    loading: false,
    currentPage: null,
    totalPages: null,
};

const fulfilmentsReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_FULFILMENTS + PENDING:
            return {
                ...state,
                loading: true
            };
        case FETCH_FULFILMENTS + FULFILLED:
            return {
                content: payload.content,
                loading: false,
                currentPage: payload.number,
                totalPages: payload.totalPages,
            };
        case FULFIL_HABIT + FULFILLED:
            const newFulfilments = state.content.map(elem => {
                return elem.id === payload.id ? payload : elem
            });
            return {
                ...state,
                content: newFulfilments,
            };
        case LOGOUT_ACTION + PENDING:
        case CREATE_HABIT:
            return initialState;
        default:
            return state
    }
};

export default fulfilmentsReducer;

