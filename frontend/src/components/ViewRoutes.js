import React from 'react';
import './../App.scss';
import Login from "./LoginView";
import CreateHabit from "./habit/CreateHabitView";
import {Route, Switch} from "react-router-dom";
import Home from "./HomeView";
import Logout from "./Logout";
import Fulfilments from "./habit/FulfilmentsView";
import Habits from "./habit/HabitsView";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Register from "./user/RegisterView";
import Profile from "./user/ProfileView";
import NoMatchingView from "./NoMatchingView";
import {CREATE, FULFILMENTS, HABITS, HOME, LOGIN, LOGOUT, PROFILE, REGISTER, ROOT} from "../common/paths";

export default function ViewRoutes() {
    return (
        <Switch>
            <Route path={ROOT} exact={true}>
                <Home/>
            </Route>
            <Route path={HOME}>
                <Home/>
            </Route>
            <Route path={LOGIN}>
                <Login/>
            </Route>
            <Route path={REGISTER}>
                <Register/>
            </Route>
            <AuthenticatedRoute path={LOGOUT}>
                <Logout/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={CREATE}>
                <CreateHabit/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={FULFILMENTS}>
                <Fulfilments/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={HABITS}>
                <Habits/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={PROFILE}>
                <Profile/>
            </AuthenticatedRoute>
            <Route component={NoMatchingView}/>

        </Switch>
    );
}
