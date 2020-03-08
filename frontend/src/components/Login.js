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
        this.state = {login: '', password: '', validated: false};
    }

    handleLoginChange = (event) => {
        this.setState({login: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const {dispatch} = this.props;
            dispatch(Api.postLogin(this.state.login, this.state.password));
            event.preventDefault();
        }
        this.setState({validated: true});
    };

    render() {
        const {t} = this.props;

        if (this.props.user.login) {
            return <Redirect to={Paths.HOME} push={true}/>
        }
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group controlId="login">
                    <Form.Label>
                        {t('login.loginPlaceholder')}
                    </Form.Label>
                    <Form.Control type="email" placeholder={t('login.loginPlaceholder')} value={this.state.login}
                                  onChange={this.handleLoginChange} required/>
                    <Form.Control.Feedback type="invalid">
                        {t('login.invalidLogin')}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>
                        {t('login.passwordPlaceholder')}
                    </Form.Label>
                    <Form.Control type="password" placeholder={t('login.passwordPlaceholder')} value={this.state.password}
                                  onChange={this.handlePasswordChange} required/>
                    <Form.Control.Feedback type="invalid">
                        {t('login.invalidPassword')}
                    </Form.Control.Feedback>
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
