import React from 'react';
import '../../App.scss';
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";


export default function FulfilmentsRow({habit, streakGoal, handleChange}) {
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