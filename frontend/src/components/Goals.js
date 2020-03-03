import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";

class Goals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {goals: []};
    }

    componentDidMount() {
        Api.getGoals().payload.then((response) => {
            this.setState({goals: response})
        });
    }

    goalRows = () => {
        return this.state.goals.map((goal) => {
            return (<tr key={goal.id}>
                <td>{goal.id}</td>
                <td>{goal.title}</td>
                <td>{goal.description}</td>
            </tr>);
        });
    };

    goalTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {this.goalRows()}
                </tbody>
            </Table>
        );
    };


    render() {
        return (
            <React.Fragment>
                <h5>Goal list</h5>
                {this.state.goals.length > 0 ? this.goalTable() : "Create your first goal"}
            </React.Fragment>
        );
    }
}

export default connect()(Goals);
