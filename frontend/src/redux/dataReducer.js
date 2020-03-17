import ActionType from "./actions";

const initialState = {
    habits: [],
    fulfilments: []
};

const dataReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case ActionType.FETCH_HABITS + ActionType.FULFILLED:
            return {
                ...state,
                habits: payload
            };
        case ActionType.FETCH_FULFILMENTS + ActionType.FULFILLED:
            return {
                ...state,
                fulfilments: payload
            };
        case ActionType.FULFIL_HABIT + ActionType.FULFILLED:
            const newFulfilments = state.fulfilments.map(elem => {
                return elem.id === payload.id ? payload : elem
            });
            return {
                ...state,
                fulfilments: newFulfilments
            };
        default:
            return state
    }
};

export default dataReducer;

