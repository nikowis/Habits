import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import ErrorContainer from "./ErrorContainer";
import Paths from "./../common/paths";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import {LinkContainer} from "react-router-bootstrap"

class TopMenu extends React.Component {

    render() {
        return (
            <div className="top-menu">
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Navbar.Brand href={Paths.ROOT}>Habits</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    {this.props.authenticated ?
                        <Nav className="mr-auto">
                            <LinkContainer to={Paths.HOME}>
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.CREATE}>
                                <Nav.Link>Create</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.FULFILMENTS}>
                                <Nav.Link>Fulfilments</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.GOALS}>
                                <Nav.Link>Goals</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.LOGOUT}>
                                <Nav.Link>Logout</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        : <Nav className="mr-auto">
                            <LinkContainer to={Paths.HOME}>
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.LOGIN}>
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    }
                    </Navbar.Collapse>

                    {this.props.pendingRequests > 0 ? <Spinner animation="border" variant="primary" /> : null}
                </Navbar>
                <ErrorContainer/>
            </div>
        );
    }

}

export default connect(state => ({
    login: state.user.login,
    authenticated: state.user.authenticated,
    authError: state.app.authError,
    pendingRequests: state.app.pendingRequests
}))(TopMenu);
