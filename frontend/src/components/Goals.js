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
            return (<tr>
                <td>{goal.id}</td>
                <td>{goal.title}</td>
                <td>{goal.description}</td>
            </tr>);
        });
    };

    render() {
        return (
            <div>
                <h5>Goal list</h5>
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
            </div>
        );
    }
}

export default connect()(Goals);
