import {combineReducers, createStore} from 'redux'
import userReducer from "./userReducer";
import appReducer from "./appReducer";

export default createStore(combineReducers({
    user: userReducer,
    app: appReducer
}));