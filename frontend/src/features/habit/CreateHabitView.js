import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {withRouter} from 'react-router-dom';
import Paths from "../../common/paths";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {withTranslation} from "react-i18next";
import {Formik} from 'formik';
import {createHabitSchema} from "../../common/validation-schemas";
import {connect} from "react-redux";
import ActioType from "./../../redux/actions";


class CreateHabitView extends React.Component {

    handleSubmit = (data, actions) => {
        Api.createHabit(data).payload.then((response) => {
            if (!response.status) {
                this.props.dispatch({type: ActioType.CREATE_HABIT});
                this.props.history.push(Paths.HABITS)
            } else if (response.status && response.status === 400) {
                response.errors.forEach(err => {
                    actions.setFieldError(err.field, err.defaultMessage);
                });
            }
        });
    };

    render() {
        const {t} = this.props;

        return (
            <Formik validationSchema={createHabitSchema} onSubmit={this.handleSubmit}
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
}

export default connect()(withRouter(withTranslation()(CreateHabitView)));