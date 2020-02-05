import {combineReducers, createStore} from 'redux'
import userReducer from "./userReducer";
import goalReducer from "./goalReducer";
import appReducer from "./appReducer";

export default createStore(combineReducers({
    user: userReducer,
    goals: goalReducer,
    app: appReducer
}));