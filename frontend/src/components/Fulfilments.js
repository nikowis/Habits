import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"
import Input from "./Input";
import {connect} from "react-redux";

class Fulfilments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {fulfilments: []};
    }

    componentDidMount() {
        Api.getFulfilments().then((response) => {
            this.setState({fulfilments: response})
        });
    }

    handleCheckboxChange = (event) => {
        if (event.target.checked) {
            const selectedGoal = this.state.fulfilments.filter((goal) =>
                goal.id.toString() === event.target.id
            )[0];

            Api.fulfilGoal(selectedGoal)
                .then(res => {
                    const curFulfilments = this.state.fulfilments;
                    curFulfilments.forEach(g => g.fulfilled = g.id === res.id ? res.fulfilled : g.fulfilled);
                    this.setState({fulfilments: curFulfilments})

                });
        }
    };

    goalRows = () => {
        return this.state.fulfilments.map((goal) => {
            return <Input label={goal.title + ': ' + goal.description} type='checkbox'
                          onChange={this.handleCheckboxChange} checked={goal.fulfilled} id={goal.id} key={goal.id}/>
        });
    };

    render() {
        return (
            <div className='home'>
                <div className='fulfilments-list'>
                    <ul>
                        {this.goalRows()}
                    </ul>
                </div>
            </div>
        );

    }
}

export default connect()(Fulfilments);