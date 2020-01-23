import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Input from "./Input";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {login: '', password: '', redirect: false};
    }

    handleLoginChange = (event) => {
        this.setState({login: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleSubmit = (event) => {
        this.props.onLoginSubmit(this.state.login, this.state.password);
        this.setState({redirect: true});

        event.preventDefault();
    };

    render() {
        if(this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <Input label='Login:' type="text" onChange={this.handleLoginChange} value={this.state.login}/>
                    <Input label='Password:' type="password" onChange={this.handlePasswordChange} value={this.state.password}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );

    }
}

export default Login;
