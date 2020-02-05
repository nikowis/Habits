import ActionType from "../actions/actions";

const initialState = [];

const goalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LOADED_GOALS:
            return [
                ...action.goals
            ];
        default:
            return state
    }
};

export default goalReducer;
