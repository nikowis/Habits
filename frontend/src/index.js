import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {persistor, store} from './redux/store';
import {BrowserRouter as Router} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import './common/validation-schemas'

// return fallback gui when translations are not yet loaded
function AppWithSuspense() {
    return (
        <Suspense fallback={<div/>}>
            <App/>
        </Suspense>
    );
}

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppWithSuspense/>
            </PersistGate>
        </Provider>
    </Router>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
