import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"
import Input from "./Input";
import {connect} from "react-redux";
import ActionType from "../actions/actions";

class Home extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        Api.getFulfilments().then((response) => {
            dispatch({
                type: ActionType.LOADED_GOALS,
                goals: response
            });
        });
    }

    handleCheckboxChange = (event) => {
        if (event.target.checked) {
            const selectedGoal = this.props.goals.filter((goal) =>
                goal.id.toString() === event.target.id
            )[0];
            const {dispatch} = this.props;
            Api.fulfilGoal(selectedGoal)
                .then(res => {
                    const curGoals = this.props.goals;
                    curGoals.forEach(g => g.fulfilled = g.id === res.id ? res.fulfilled : g.fulfilled);
                    dispatch({
                        type: ActionType.LOADED_GOALS,
                        goals: curGoals
                    });
            });
        }
    };

    goalRows = () => {
        return this.props.goals.map((goal) => {
            return <Input label={goal.title + ': ' + goal.description} type='checkbox'
                          onChange={this.handleCheckboxChange} checked={goal.fulfilled} id={goal.id} key={goal.id}/>
        });
    };

    render() {
        return (
            <div className='home'>
                <div className='goals-list'>
                    <ul>
                        {this.goalRows()}
                    </ul>
                </div>
            </div>
        );

    }
}

export default connect( state => ({
    goals: state.goals,
}))(Home);
