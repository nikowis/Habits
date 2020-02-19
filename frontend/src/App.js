import React, {Component} from 'react';
import './App.scss';
import Login from "./components/Login";
import CreateGoal from "./components/CreateGoal";
import {Redirect, Route, Switch} from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Home from "./components/Home";
import CreatedGoal from "./components/CreatedGoal";
import {connect} from "react-redux";
import Api from "./common/api-communication";
import ActionType from "./actions/actions";
import Logout from "./components/Logout";
import Fulfilments from "./components/Fulfilments";
import Goals from "./components/Goals";

class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props;

        if (!this.props.user.login) {
            Api.getMe().then((user) => {
                dispatch({
                    type: ActionType.LOGIN_ACTION
                    , id: user.id
                    , login: user.login
                });
            });
        }
    }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                          crossOrigin="anonymous"/>
                </header>
                <TopMenu/>
                <Switch>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/logout">
                        <Logout/>
                    </Route>
                    <Route path="/create">
                        <CreateGoal/>
                    </Route>
                    <Route path="/created">
                        <CreatedGoal/>
                    </Route>
                    <Route path="/fulfilments">
                        <Fulfilments/>
                    </Route>
                    <Route path="/goals">
                        <Goals/>
                    </Route>
                </Switch>
                {!this.props.user.login && window.location.pathname !== '/login' ? <Redirect to='/login'/> : null}
                {this.props.user.login && window.location.pathname === '/' ? <Redirect to='/home'/> : null}
            </div>
        );

    }
}

export default connect(state => ({
    user: state.user,
}))(App);
