import React, {Component} from 'react';
import './App.css';
import Login from "./Login";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {name: ''};
    }

    componentDidMount() {
    }

    handleLogin = (login) => {
        this.setState({name: login})
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                          crossOrigin="anonymous"/>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
                </header>

                {this.state.name? null : <Login onLoginSubmit={this.handleLogin}/>}
                {this.state.name ? "Logged in as " + this.state.name : ""}

            </div>
        );
    }
}

export default App;
