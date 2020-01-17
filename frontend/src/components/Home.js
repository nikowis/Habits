import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"
import Input from "./Input";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goals: []
        };
    }

    componentDidMount() {
        Api.getGoals(this.props.login).then((response) => {
            this.setState({goals: response})
        });
    }

    handleCheckboxChange = (event) => {
        if (event.target.checked) {
            const selectedGoal = this.state.goals.filter((goal) =>
                goal.id.toString() === event.target.id
            )[0];
            const self = this;
            Api.fulfilGoal(this.props.login, selectedGoal)
                .then(res => {
                var curGoals = this.state.goals;
                curGoals.forEach(g => g.fulfilled = g.id === res.id ?  res.fulfilled : g.fulfilled);
                self.setState({goals: curGoals});
            });
        }
    };

    goalRows = () => {
        return this.state.goals.map((goal) => {
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

export default Home;
