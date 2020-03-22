import React from 'react';
import '../../App.scss';
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import PropTypes from 'prop-types';

function FulfilmentsRow({habit, streakGoal, handleChange}) {
    const label = habit.title + (habit.description ? ': ' + habit.description : '');
    return (
        <>
            <Form.Check
                type='checkbox'
                checked={habit.fulfilled}
                id={habit.id}
                key={habit.id}
                onChange={handleChange}
                label={label}
            />
            <ProgressBar now={habit.streak} max={streakGoal}/>
        </>
    );
}

FulfilmentsRow.propTypes = {
    habit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        fulfilled: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    streakGoal: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default FulfilmentsRow;