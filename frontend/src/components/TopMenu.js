import React from 'react';
import '../App.scss';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import ErrorContainer from "./ErrorContainer";

class TopMenu extends React.Component {

    render() {
        return (
            <div className="top-menu">
                {this.headerContent()}
                <ErrorContainer/>
            </div>
        );
    }

    headerContent() {
        return (<div>
                <nav className="navigation">
                    { this.props.authenticated ? null : <Link to="/login">Login</Link>}
                    { this.props.authenticated ? <Link to="/home">Home</Link> : null}
                    { this.props.authenticated ? <Link to="/create">Create</Link> : null}
                    { this.props.authenticated ? <Link to="/fulfilments">Fulfilments</Link> : null}
                    { this.props.authenticated ? <Link to="/goals">Goals</Link> : null}
                    { this.props.authenticated ? <Link to="/logout">Logout</Link> : null}
                </nav>
                <div className="welcome-message">
                    Habits
                </div>
            </div>
        );
    }
}

export default connect( state => ({
    login: state.user.login,
    authenticated: state.app.authenticated,
    authError: state.app.authError
}))(TopMenu);
