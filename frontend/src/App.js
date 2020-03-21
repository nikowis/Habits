import React, {Component} from 'react';
import './App.scss';
import TopMenu from "./components/TopMenu";
import {connect} from "react-redux";
import ViewTitle from "./components/ViewTitle";
import Api from "./common/api-communication";
import ViewRoutes from "./components/ViewRoutes";

class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.authenticated) {
            dispatch(Api.getUser());
            dispatch(Api.getHabits());
            dispatch(Api.getFulfilments());
        }
    }

    render() {
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
}

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(App);
