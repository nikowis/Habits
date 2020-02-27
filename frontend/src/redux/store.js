import {combineReducers, createStore, applyMiddleware} from 'redux'
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer
});

const persistConfig = {
    key: 'user',
    storage: storage,
    whitelist: ['user']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(promise, logger);
const store = createStore(persistedReducer, {}, middleware);

const persistor = persistStore(store);
export { persistor, store };
