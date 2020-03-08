import React from 'react';
import '../App.scss';
import Alert from "react-bootstrap/Alert";
import {connect} from "react-redux";

class ErrorContainer extends React.Component {

    errorContainer = (message) => {
        return (
            <Alert variant='danger'>
                {message}
            </Alert>
        );
    };

    render() {
        return (
            <div className='error-container'>
                {this.props.authError ? this.errorContainer(this.props.errorMessage) : null}
                {this.props.apiError ? this.errorContainer(this.props.errorMessage) : null}
            </div>
        );
    }
}

export default connect(state => ({
    authError: state.app.authError,
    apiError: state.app.apiError,
    errorMessage: state.app.errorMessage
}))(ErrorContainer);