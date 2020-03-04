import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"
import {withRouter} from 'react-router-dom';
import Paths from "../common/paths";
import Form from "react-bootstrap/Form";
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
            <div>
                <h5>Create goal</h5>
                <Form onSubmit={this.handleCreateGoal}>
                    <Form.Group controlId="title">
                        <Form.Control type="text" placeholder="Title" value={this.state.title}
                                      onChange={this.titleChangeHandler}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Control as="textarea" rows="3" placeholder="Description" value={this.state.description}
                                      onChange={this.descriptionChangeHandler}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );

    }
}

export default withRouter(CreateGoal);
