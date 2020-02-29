import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import ErrorContainer from "./ErrorContainer";
import Paths from "./../common/paths";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class TopMenu extends React.Component {

    render() {
        return (
            <span className="top-menu">
                <Navbar bg="dark" variant="dark" className="top-menu">
                    <Navbar.Brand href="#home">Habits</Navbar.Brand>
                    {this.props.authenticated ?
                        <Nav className="mr-auto">
                            <Nav.Link href={Paths.HOME}>Home</Nav.Link>
                            <Nav.Link href={Paths.CREATE}>Create</Nav.Link>
                            <Nav.Link href={Paths.FULFILMENTS}>Fulfilments</Nav.Link>
                            <Nav.Link href={Paths.GOALS}>Goals</Nav.Link>
                            <Nav.Link href={Paths.LOGOUT}>Logout</Nav.Link>
                        </Nav>
                        : <Nav className="mr-auto">
                            <Nav.Link href={Paths.LOGIN}>Login</Nav.Link>
                        </Nav>
                    }
                </Navbar>
                <ErrorContainer/>
            </span>
        );
    }

}

export default connect(state => ({
    login: state.user.login,
    authenticated: state.user.authenticated,
    authError: state.app.authError,
    pendingRequests: state.app.pendingRequests
}))(TopMenu);
