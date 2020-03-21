import {combineReducers} from "redux";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import dataReducer from "./dataReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const USER_REDUCER_KEY = 'user';
const APP_REDUCER_KEY = 'app';
const DATA_REDUCER_KEY = 'data';

const rootReducer = combineReducers({
    [USER_REDUCER_KEY]: userReducer,
    [APP_REDUCER_KEY]: appReducer,
    [DATA_REDUCER_KEY]: dataReducer,
});

const persistConfig = {
    key: USER_REDUCER_KEY,
    storage: storage,
    whitelist: [USER_REDUCER_KEY]
};

export default persistReducer(persistConfig, rootReducer);


