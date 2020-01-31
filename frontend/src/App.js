import React, {Component} from 'react';
import './App.scss';
import Login from "./components/Login";
import CreateGoal from "./components/CreateGoal";
import FulfilGoal from "./components/FulfilGoal";
import {Redirect, Route, Switch} from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Home from "./components/Home";
import CreatedGoal from "./components/CreatedGoal";
import {connect} from "react-redux";
import Api from "./common/api-communication";
import ActionType from "./actions/actions";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {redirect: false};
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const self = this;
        Api.getMe().then(res => {
            if (res.status === 200) {
                res.json().then(user => {
                    dispatch({
                        type: ActionType.LOGIN_ACTION
                        , id: user.id
                        , login: user.login
                    });
                });
            } else if (res.status === 401) {
                self.setState({redirect: true});
            } else {
                console.log(res);
            }
        });
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
                    <Route path="/create">
                        <CreateGoal/>
                    </Route>
                    <Route path="/created">
                        <CreatedGoal/>
                    </Route>
                    <Route path="/fulfil">
                        <FulfilGoal/>
                    </Route>
                </Switch>
                {this.state.redirect ? <Redirect to='/login'/> : null}
            </div>
        );
    }
}

export default connect(state => ({
    user: state.user,
}))(App);
