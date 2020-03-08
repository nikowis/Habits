import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {withRouter} from 'react-router-dom';
import Paths from "../../common/paths";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {withTranslation} from "react-i18next";

class CreateGoal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: '', description: '', createdBy: this.props.login, validated: false}
    }

    titleChangeHandler = (event) => {
        this.setState({title: event.target.value});
    };

    descriptionChangeHandler = (event) => {
        this.setState({description: event.target.value});
    };

    handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            Api.createGoal({...this.state});
            this.props.history.push(Paths.GOALS)
        }
        this.setState({validated: true});
    };

    render() {
        const {t} = this.props;

        return (
            <div>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>
                            {t('goals.create.titlePlaceholder')}
                        </Form.Label>
                        <Form.Control type="text" placeholder={t('goals.create.titlePlaceholder')} value={this.state.title}
                                      onChange={this.titleChangeHandler} required/>
                        <Form.Control.Feedback type="invalid">
                            {t('goals.create.invalidTitle')}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>
                            {t('goals.create.descriptionPlaceholder')}
                        </Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder={t('goals.create.descriptionPlaceholder')} value={this.state.description}
                                      onChange={this.descriptionChangeHandler} required/>
                        <Form.Control.Feedback type="invalid">
                            {t('goals.create.invalidDescription')}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {t('goals.create.submit')}
                    </Button>
                </Form>
            </div>
        );

    }
}

export default withRouter(withTranslation()(CreateGoal));
