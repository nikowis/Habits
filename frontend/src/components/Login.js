import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import Paths from "../common/paths";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormLabel from "react-bootstrap/FormLabel";


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
        dispatch(Api.postLogin(this.state.login, this.state.password));
        event.preventDefault();
    };

    render() {
        if (this.props.user.login) {
            return <Redirect to={Paths.HOME} push={true}/>
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormLabel>Please login</FormLabel>
                <Form.Group controlId="login">
                    <Form.Control type="email" placeholder="Login" value={this.state.login}
                                  onChange={this.handleLoginChange}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control type="password" placeholder="Password" value={this.state.password}
                                  onChange={this.handlePasswordChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default connect(state => ({
    user: state.user,
}))(Login);
