import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"
import {withRouter} from 'react-router-dom';
import Paths from "../common/paths";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";

class CreateGoal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: '', description: '', createdBy: this.props.login}
    }

    titleChangeHandler = (event) => {
        this.setState({title: event.target.value});
    };

    descriptionChangeHandler = (event) => {
        this.setState({description: event.target.value});
    };

    handleCreateGoal = async (event) => {
        event.preventDefault();
        const goal = await Api.createGoal({...this.state});
        console.log(goal);
        this.props.history.push(Paths.GOALS)
    };

    render() {
        return (
            <Form onSubmit={this.handleCreateGoal}>
                <FormLabel>Create goal</FormLabel>
                <Form.Group controlId="title">
                    <Form.Control type="text" placeholder="Title" value={this.state.title}
                                  onChange={this.titleChangeHandler}/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Control type="text" placeholder="Description" value={this.state.description}
                                  onChange={this.descriptionChangeHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );

    }
}

export default withRouter(CreateGoal);
