import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SuspenseFallbackComponent from './SuspenseFallbackComponent'
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore from './redux/store/configureStore.js';
import {BrowserRouter as Router} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import './common/validation-schemas'
import App from "./App";

export const {persistor, store} = configureStore();

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SuspenseFallbackComponent>
                    <App/>
                </SuspenseFallbackComponent>
            </PersistGate>
        </Provider>
    </Router>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
