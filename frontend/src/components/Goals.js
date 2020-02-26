import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"
import {connect} from "react-redux";

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
            <div className='home'>
                <table className='goals-table'>
                    <tr>
                        <td>Id</td>
                        <td>Title</td>
                        <td>Description</td>
                    </tr>
                    {this.goalRows()}
                </table>
            </div>
        );

    }
}

export default connect()(Goals);
