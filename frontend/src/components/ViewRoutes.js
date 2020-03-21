import React from 'react';
import './../App.scss';
import Login from "./LoginView";
import CreateHabit from "./habit/CreateHabitView";
import {Route, Switch} from "react-router-dom";
import Home from "./HomeView";
import Logout from "./Logout";
import Fulfilments from "./habit/FulfilmentsView";
import Habits from "./habit/HabitsView";
import Paths from "./../common/paths";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Register from "./user/RegisterView";
import Profile from "./user/ProfileView";
import NoMatchingView from "./NoMatchingView";

export default function ViewRoutes() {
    return (
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
            <AuthenticatedRoute path={Paths.LOGOUT}>
                <Logout/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={Paths.CREATE}>
                <CreateHabit/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={Paths.FULFILMENTS}>
                <Fulfilments/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={Paths.HABITS}>
                <Habits/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={Paths.PROFILE}>
                <Profile/>
            </AuthenticatedRoute>
            <Route component={NoMatchingView}/>

        </Switch>
    );
}
