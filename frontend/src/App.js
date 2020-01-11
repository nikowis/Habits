import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login";
import TopMenu from "./components/TopMenu";
import CreateGoal from "./components/CreateGoal";
import FulfilGoal from "./components/FulfilGoal";
import * as MainViewStates from "./MainViewStates";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {login: '', view: MainViewStates.FULFIL_GOAL};
    }

    handleLogin = (login) => {
        this.setState({login: login})
    };

    mainView = () => {
      let view;
      if(this.state.view === MainViewStates.CREATE_GOAL) {
          view = <CreateGoal/>;
      } else if (this.state.view === MainViewStates.FULFIL_GOAL) {
          view = <FulfilGoal/>;
      }
      return view;
    };

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                          crossOrigin="anonymous"/>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
                </header>
                {this.state.login ? null : <Login onLoginSubmit={this.handleLogin}/>}
                <TopMenu login={this.state.login}/>
                {this.state.login ? this.mainView() : null}
            </div>
        );
    }
}

export default App;
