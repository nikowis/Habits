import React from 'react';
import '../App.scss';
import {withRouter} from 'react-router-dom';

class CreatedGoal extends React.Component {

    render() {
        return (
            <div className="created-goal">
                Goal created!
                <button onClick={this.handleBack}>Back</button>
            </div>

        );

    }

    handleBack = () => {
        this.props.history.push('create')
    }
}

export default withRouter(CreatedGoal);
