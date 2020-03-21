import React from 'react';
import '../App.scss';
import Alert from "react-bootstrap/Alert";
import {connect} from "react-redux";

function ErrorContainer (props){

    const errorContainer = (message) => {
        return (
            <Alert variant='danger'>
                {message}
            </Alert>
        );
    };

    return (
        <div className='error-container'>
            {props.authError ? errorContainer(props.errorMessage) : null}
            {props.apiError ? errorContainer(props.errorMessage) : null}
        </div>
    );

}

export default connect(state => ({
    authError: state.app.authError,
    apiError: state.app.apiError,
    errorMessage: state.app.errorMessage
}))(ErrorContainer);