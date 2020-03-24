import {combineReducers} from "redux";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import habitsReducer from "./habitsReducer";
import fulfilmentsReducer from "./fulfilmentsReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const USER_REDUCER_KEY = 'user';
const APP_REDUCER_KEY = 'app';
const HABITS_REDUCER_KEY = 'habits';
const FULFILMENTS_REDUCER_KEY = 'fulfilments';

const rootReducer = combineReducers({
    [USER_REDUCER_KEY]: userReducer,
    [APP_REDUCER_KEY]: appReducer,
    [HABITS_REDUCER_KEY]: habitsReducer,
    [FULFILMENTS_REDUCER_KEY]: fulfilmentsReducer,
});

const persistConfig = {
    key: USER_REDUCER_KEY,
    storage: storage,
    whitelist: [USER_REDUCER_KEY]
};

export default persistReducer(persistConfig, rootReducer);


