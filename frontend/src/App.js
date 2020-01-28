import React, {Component} from 'react';
import './App.scss';
import Login from "./components/Login";
import CreateGoal from "./components/CreateGoal";
import FulfilGoal from "./components/FulfilGoal";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Home from "./components/Home";
import CreatedGoal from "./components/CreatedGoal";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="app">
                    <header className="app-header">
                        <link rel="stylesheet"
                              href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                              integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                              crossOrigin="anonymous"/>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"/>
                        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"/>
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
                </div>
            </Router>

        );
    }
}

export default App;
