import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {withRouter} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {Formik} from 'formik';
import {createHabitSchema} from "../../common/validation-schemas";
import {connect} from "react-redux";
import {CREATE_HABIT, HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {HABITS} from "../../common/paths";
import {store} from "../../index";
import {NOTIFICATION_DURATION} from "../../common/app-constants";

function CreateHabitView(props) {

    const {t} = useTranslation();

    const handleSubmit = (data, actions) => {
        Api.createHabit(data).payload.then((response) => {
            if (!response.status) {
                props.dispatch({type: CREATE_HABIT});
                props.dispatch({type: SHOW_NOTIFICATION, payload: t('notification.habitCreated')});
                setTimeout(() => {
                    store.dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
                props.history.push(HABITS)
            } else if (response.status && response.status === 400) {
                response.errors.forEach(err => {
                    actions.setFieldError(err.field, err.defaultMessage);
                });
            }
        });
    };

    return (
        <Formik validationSchema={createHabitSchema} onSubmit={handleSubmit}
                initialValues={{
                    title: '',
                    description: ''
                }}
        >
            {({touched, errors, handleSubmit, handleChange, values}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>
                            {t('title')}
                        </Form.Label>
                        <Form.Control name="title" value={values.title} onChange={handleChange} type="text"
                                      placeholder={t('title')}
                                      isInvalid={touched.title && !!errors.title}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.title)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>
                            {t('description')}
                        </Form.Label>
                        <Form.Control name="description" value={values.description} onChange={handleChange}
                                      as="textarea" rows="3" placeholder={t('description')}
                                      isInvalid={touched.description && !!errors.description}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.description)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {t('habits.create.submit')}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

CreateHabitView.propTypes = {};

export default connect()(withRouter(CreateHabitView));
