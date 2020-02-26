import {combineReducers, createStore, applyMiddleware} from 'redux'
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import promise from 'redux-promise-middleware';

export default createStore(combineReducers({
    user: userReducer,
    app: appReducer
}), {}, applyMiddleware(promise));
