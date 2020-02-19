import React from 'react';
import '../App.scss';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import ErrorContainer from "./ErrorContainer";
import Paths from "./../common/paths";

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
                    { this.props.authenticated ? null : <Link to={Paths.LOGIN}>Login</Link>}
                    { this.props.authenticated ? <Link to={Paths.HOME}>Home</Link> : null}
                    { this.props.authenticated ? <Link to={Paths.CREATE}>Create</Link> : null}
                    { this.props.authenticated ? <Link to={Paths.FULFILMENTS}>Fulfilments</Link> : null}
                    { this.props.authenticated ? <Link to={Paths.GOALS}>Goals</Link> : null}
                    { this.props.authenticated ? <Link to={Paths.LOGOUT}>Logout</Link> : null}
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
