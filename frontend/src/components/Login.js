import React from 'react';
import './../App.css';
import {Redirect} from "react-router-dom";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', redirect: false};
    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
    };

    handleSubmit = (event) => {
        this.props.onLoginSubmit(this.state.name)
        this.setState({redirect: true})
        event.preventDefault();
    };

    render() {
        if(this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Login:
                        <input value={this.state.name} onChange={this.handleChange} type="text"/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );

    }
}

export default Login;
