import { combineReducers } from 'redux'
import userReducer from "./userReducer";
import goalReducer from "./goalReducer";

export default combineReducers({
    user: userReducer,
    goals: goalReducer
})
