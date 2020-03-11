import React from 'react';
import '../../App.scss';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Paths from "../../common/paths";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Api from "../../common/api-communication";
import ActionType from './../../redux/actions'

import {withTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {store} from "../../redux/store";
import Const from "../../common/app-constants";
import {withRouter} from 'react-router-dom';

class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (data, actions) => {
        const {dispatch} = this.props;
        Api.postRegister(data.login, data.password).payload.then((response) => {
            console.log(JSON.stringify(response));
            if(!response.status) {
                this.props.history.push(Paths.LOGIN)
            } else if (response.status && response.status === 400) {
                response.errors.forEach(err => {
                    actions.setFieldError(err.field, err.defaultMessage);
                });
            }
        });
    };

    render() {
        const {t} = this.props;

        if (this.props.authenticated) {
            return <Redirect to={Paths.HOME} push={true}/>
        }

        const schema = Yup.object().shape({
            login: Yup.string()
                .email('validations.email')
                .required('validations.required'),
            password: Yup.string()
                .min(1, 'validations.min')
                .required('validations.required'),
            repeatPassword: Yup.string()
                .required('validations.required')
                .oneOf([Yup.ref('password')], 'validations.passwordMatch')
        });

        return (
            <Formik
                validationSchema={schema}
                onSubmit={this.handleSubmit}
                initialValues={{
                    login: '',
                    password: '',
                    repeatPassword: ''
                }}
            >
                {({
                      touched,
                      errors,
                      handleSubmit,
                      handleChange,
                      values,
                      isValid
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="login">
                            <Form.Label>
                                {t('register.loginPlaceholder')}
                            </Form.Label>
                            <Form.Control name="login" value={values.login} onChange={handleChange} type="email"
                                          isInvalid={touched.login && !!errors.login}
                                          placeholder={t('register.loginPlaceholder')}/>
                            <Form.Control.Feedback type="invalid">
                                {t(errors.login)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>
                                {t('register.passwordPlaceholder')}
                            </Form.Label>
                            <Form.Control name="password" value={values.password} onChange={handleChange}
                                          type="password"
                                          isInvalid={touched.password && !!errors.password}
                                          placeholder={t('register.passwordPlaceholder')}/>
                            <Form.Control.Feedback type="invalid">
                                {t(errors.password)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="repeatPassword">
                            <Form.Label>
                                {t('register.repeatPasswordPlaceholder')}
                            </Form.Label>
                            <Form.Control name="repeatPassword" value={values.repeatPassword} onChange={handleChange}
                                          type="password"
                                          isInvalid={touched.repeatPassword && !!errors.repeatPassword}
                                          placeholder={t('register.repeatPasswordPlaceholder')}/>
                            <Form.Control.Feedback type="invalid">
                                {t(errors.repeatPassword)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {t('register.submit')}
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    }
}


export default connect(state => ({
    authenticated: state.user.authenticated,
}))(withRouter(withTranslation()(Register)));
