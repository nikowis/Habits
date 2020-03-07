import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import Paths from "../common/paths";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {withTranslation} from 'react-i18next';

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
        const {t} = this.props;

        if (this.props.user.login) {
            return <Redirect to={Paths.HOME} push={true}/>
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <h5>{t('login.title')}</h5>
                <Form.Group controlId="login">
                    <Form.Control type="email" placeholder={t('login.placeholder')} value={this.state.login}
                                  onChange={this.handleLoginChange}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control type="password" placeholder={t('password')} value={this.state.password}
                                  onChange={this.handlePasswordChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {t('login.submit')}
                </Button>
            </Form>
        );
    }
}

export default connect(state => ({
    user: state.user,
}))(withTranslation()(Login));
