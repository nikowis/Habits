import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Input from "./Input";
import ActionType from "../actions/actions";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import Paths from "../common/paths";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {login: '', password: ''};
    }

    handleLoginChange = (event) => {
        this.setState({login: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleSubmit = (event) => {
        const {dispatch} = this.props;
        Api.postLogin(this.state.login, this.state.password).then(res => {
            if(res) {
                dispatch({
                    type: ActionType.LOGIN_ACTION
                    , id: res.id
                    , login: res.login
                });
            }
        });
        event.preventDefault();
    };

    render() {
        if(this.props.user.login) {
            return <Redirect to={Paths.HOME} push={true} />
        }
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <Input id='login' label='Login:' type="text" onChange={this.handleLoginChange} value={this.state.login}/>
                    <Input id='password' label='Password:' type="password" onChange={this.handlePasswordChange} value={this.state.password}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default connect( state => ({
    user: state.user,
}))(Login);
