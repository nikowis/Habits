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
    habits: null,
    fulfilments: null
};

const dataReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_HABITS + FULFILLED:
            return {
                ...state,
                habits: payload
            };
        case FETCH_FULFILMENTS + FULFILLED:
            return {
                ...state,
                fulfilments: payload
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

