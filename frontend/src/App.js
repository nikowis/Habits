import React, {useEffect} from 'react';
import './App.scss';
import TopMenu from "./components/TopMenu";
import {connect} from "react-redux";
import ViewTitle from "./components/ViewTitle";
import Api from "./common/api-communication";
import ViewRoutes from "./components/ViewRoutes";
import PropTypes from "prop-types";

function App(props) {

    const {dispatch, authenticated} = props;

    useEffect(() => {
        if (authenticated) {
            dispatch(Api.getUser());
            dispatch(Api.getHabits());
            dispatch(Api.getFulfilments());
        }
    }, [dispatch, authenticated]);

    return (
        <div className="app">
            <header className="app-header">
            </header>
            <TopMenu/>
            <ViewTitle/>
            <div className="app-card">
                <div className="app-content">
                    <ViewRoutes/>
                </div>
            </div>
        </div>
    );

}

App.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(App);
