import React, {Component} from 'react';
import './App.scss';
import Login from "./components/Login";
import CreateGoal from "./components/CreateGoal";
import {Redirect, Route, Switch} from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Home from "./components/Home";
import {connect} from "react-redux";
import Logout from "./components/Logout";
import Fulfilments from "./components/Fulfilments";
import Goals from "./components/Goals";
import Paths from "./common/paths";
import Api from "./common/api-communication";

class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props;

        if (!this.props.user.login) {
            dispatch(Api.getMe());
        }
    }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                </header>
                <TopMenu/>
                <Switch>
                    <Route path={Paths.HOME}>
                        <Home/>
                    </Route>
                    <Route path={Paths.LOGIN}>
                        <Login/>
                    </Route>
                    <Route path={Paths.LOGOUT}>
                        <Logout/>
                    </Route>
                    <Route path={Paths.CREATE}>
                        <CreateGoal/>
                    </Route>
                    <Route path={Paths.FULFILMENTS}>
                        <Fulfilments/>
                    </Route>
                    <Route path={Paths.GOALS}>
                        <Goals/>
                    </Route>
                </Switch>
                {!this.props.user.login && window.location.pathname !== '/login' ? <Redirect to={Paths.LOGIN}/> : null}
                {this.props.user.login && window.location.pathname === '/' ? <Redirect to={Paths.HOME}/> : null}
            </div>
        );

    }
}

export default connect(state => ({
    user: state.user,
}))(App);
