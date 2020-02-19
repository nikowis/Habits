import React from 'react';
import '../App.scss';
import Input from "./Input";
import Api from "./../common/api-communication"
import { withRouter } from 'react-router-dom';
import Paths from "../common/paths";

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
            <div className="create-goal-form">
                Create goal
                <form onSubmit={this.handleCreateGoal}>
                    <Input label="Title" onChange={this.titleChangeHandler} value={this.state.title}/>
                    <Input label="Description" onChange={this.descriptionChangeHandler} value={this.state.description}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>

        );

    }
}

export default withRouter(CreateGoal);
