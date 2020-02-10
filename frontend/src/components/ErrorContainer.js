import React from 'react';
import '../App.scss';
import {connect} from "react-redux";

class ErrorContainer extends React.Component {

    render() {
        return (
            <div className='error-container'>
                {this.props.authError ? "Authentication error" : null}
                {this.props.apiError ? "Api error" : null}
            </div>
        );
    }

}

export default connect( state => ({
    authError: state.app.authError,
    apiError: state.app.apiError
}))(ErrorContainer);
