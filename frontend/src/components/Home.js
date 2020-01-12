import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"

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

    goalRows = () => {
        return this.state.goals.map((goal)=> {
           console.log(goal)
           return <li>{goal.title}:{goal.description}</li>
        });
    };

    render() {
        return (
            <div className="home">
                <ul>
                    {this.goalRows()}
                </ul>
            </div>
        );

    }
}

export default Home;
