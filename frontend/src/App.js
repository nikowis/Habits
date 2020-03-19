import React, {Component} from 'react';
import './App.scss';
import Login from "./components/LoginView";
import CreateHabit from "./features/habit/CreateHabitView";
import {Route, Switch} from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Home from "./components/HomeView";
import {connect} from "react-redux";
import Logout from "./components/Logout";
import Fulfilments from "./features/habit/FulfilmentsView";
import Habits from "./features/habit/HabitsView";
import Paths from "./common/paths";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import TitleHeader from "./components/TitleHeader";
import Register from "./features/user/RegisterView";
import Profile from "./features/user/ProfileView";
import Api from "./common/api-communication";

class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if(this.props.authenticated) {
            dispatch(Api.getUser());
            dispatch(Api.getHabits());
            dispatch(Api.getFulfilments());
        }
    }

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
                                <CreateHabit/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path={Paths.FULFILMENTS} authenticated={authenticated}>
                                <Fulfilments/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path={Paths.HABITS} authenticated={authenticated}>
                                <Habits/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path={Paths.PROFILE} authenticated={authenticated}>
                                <Profile/>
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
