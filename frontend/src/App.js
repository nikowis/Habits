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

class App extends Component {

    render() {
        return (
            <div className="app">
                <header className="app-header">
                </header>
                <TopMenu/>
                <div className="app-content">
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
                </div>
                {!this.props.user.login && window.location.pathname !== '/login' && window.location.pathname !== '/home' ? <Redirect to={Paths.LOGIN}/> : null}
            </div>
        );

    }
}

export default connect(state => ({
    user: state.user,
}))(App);
