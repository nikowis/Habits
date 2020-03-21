import {applyMiddleware, createStore} from 'redux'
import rootReducer from "./../rootReducer";
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';


const middleware = applyMiddleware(promise, logger);
const store = createStore(rootReducer, {}, composeWithDevTools(middleware));

const persistor = persistStore(store);
export { persistor, store };
