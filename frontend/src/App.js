import React, {Component} from 'react';
import './App.scss';
import Login from "./components/Login";
import CreateGoal from "./features/goal/CreateGoal";
import {Route, Switch} from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Home from "./components/Home";
import {connect} from "react-redux";
import Logout from "./components/Logout";
import Fulfilments from "./features/goal/Fulfilments";
import Goals from "./features/goal/Goals";
import Paths from "./common/paths";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import TitleHeader from "./components/TitleHeader";
import Register from "./features/user/Register";

class App extends Component {

    render() {
        const authenticated = this.props.authenticated;
        return (
            <div className="app">
                <header className="app-header">
                </header>
                <TopMenu/>
                <TitleHeader/>
                <div className="app-card">
                    <div className="app-content">
                        <Switch>
                            <Route path={Paths.ROOT} exact={true}>
                                <Home/>
                            </Route>
                            <Route path={Paths.HOME}>
                                <Home/>
                            </Route>
                            <Route path={Paths.LOGIN}>
                                <Login/>
                            </Route>
                            <Route path={Paths.REGISTER}>
                                <Register/>
                            </Route>
                            <AuthenticatedRoute path={Paths.LOGOUT} authenticated={authenticated}>
                                <Logout/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path={Paths.CREATE} authenticated={authenticated}>
                                <CreateGoal/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path={Paths.FULFILMENTS} authenticated={authenticated}>
                                <Fulfilments/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path={Paths.GOALS} authenticated={authenticated}>
                                <Goals/>
                            </AuthenticatedRoute>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(App);
