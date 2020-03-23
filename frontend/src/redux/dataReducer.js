import {
    CREATE_HABIT,
    FETCH_FULFILMENTS,
    FETCH_HABITS,
    FULFIL_HABIT,
    FULFILLED,
    LOGOUT_ACTION,
    PENDING
} from "./actions";

const initialState = {
    habits: {
        content: null,
        loading: false,
        currentPage: null,
        totalPages: null,
    },
    fulfilments: {
        content: null,
        loading: false,
        currentPage: null,
        totalPages: null,
    }
};

const dataReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_HABITS + PENDING:
            return {
                ...state,
                habits: {
                    content: state.habits.content,
                    loading: false,
                    currentPage: state.habits.number,
                    totalPages: state.habits.totalPages,
                }
            };
        case FETCH_HABITS + FULFILLED:
            return {
                ...state,
                habits: {
                    content: payload.content,
                    loading: false,
                    currentPage: payload.number,
                    totalPages: payload.totalPages,
                }
            };
        case FETCH_FULFILMENTS + PENDING:
            return {
                ...state,
                fulfilments: {
                    content: state.fulfilments.content,
                    loading: true,
                    currentPage: state.fulfilments.number,
                    totalPages: state.fulfilments.totalPages,
                }
            };
        case FETCH_FULFILMENTS + FULFILLED:
            return {
                ...state,
                fulfilments: {
                    content: payload.content,
                    loading: false,
                    currentPage: payload.number,
                    totalPages: payload.totalPages,
                }
            };
        case FULFIL_HABIT + FULFILLED:
            const newFulfilments = state.fulfilments.map(elem => {
                return elem.id === payload.id ? payload : elem
            });
            return {
                ...state,
                fulfilments: newFulfilments
            };
        case LOGOUT_ACTION + PENDING:
            return initialState;
        case CREATE_HABIT:
            return {
                ...state,
                habits: null,
                fulfilments: null
            };
        default:
            return state
    }
};

export default dataReducer;

