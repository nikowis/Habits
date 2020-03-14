import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import Paths from "../common/paths";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {withTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {loginSchema} from "../common/validation-schemas";

class Login extends React.Component {

    handleSubmit = (data) => {
        const {dispatch} = this.props;
        dispatch(Api.postLogin(data.login, data.password));
    };

    render() {
        const {t} = this.props;

        if (this.props.authenticated) {
            return <Redirect to={Paths.HOME} push={true}/>
        }

        return (
            <Formik validationSchema={loginSchema} onSubmit={this.handleSubmit}
                    initialValues={{
                        login: '',
                        password: ''
                    }}
            >
                {({touched, errors, handleSubmit, handleChange, values}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="login">
                            <Form.Label>
                                {t('login.loginPlaceholder')}
                            </Form.Label>
                            <Form.Control name="login" value={values.login} onChange={handleChange} type="email"
                                          isInvalid={touched.login && !!errors.login}
                                          placeholder={t('login.loginPlaceholder')}/>
                            <Form.Control.Feedback type="invalid">
                                {t(errors.login)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>
                                {t('login.passwordPlaceholder')}
                            </Form.Label>
                            <Form.Control name="password" value={values.password} onChange={handleChange}
                                          type="password"
                                          isInvalid={touched.password && !!errors.password}
                                          placeholder={t('login.passwordPlaceholder')}/>
                            <Form.Control.Feedback type="invalid">
                                {t(errors.password)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {t('login.submit')}
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(withTranslation()(Login));
