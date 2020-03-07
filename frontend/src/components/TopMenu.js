import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import ErrorContainer from "./ErrorContainer";
import Paths from "./../common/paths";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import {LinkContainer} from "react-router-bootstrap"
import { withTranslation } from 'react-i18next';


class TopMenu extends React.Component {

    render() {
        const { t } = this.props;

        return (
            <div className="top-menu">
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Navbar.Brand href={Paths.ROOT}>{t('brand')}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    {this.props.authenticated ?
                        <Nav className="mr-auto">
                            <LinkContainer to={Paths.HOME}>
                                <Nav.Link>{t('home.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.CREATE}>
                                <Nav.Link>{t('goal.create.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.FULFILMENTS}>
                                <Nav.Link>{t('goal.fulfill.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.GOALS}>
                                <Nav.Link>{t('goal.list.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.LOGOUT}>
                                <Nav.Link>{t('logout')}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        : <Nav className="mr-auto">
                            <LinkContainer to={Paths.HOME}>
                                <Nav.Link>{t('home.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Paths.LOGIN}>
                                <Nav.Link>{t('login.placeholder')}</Nav.Link>
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
}))(withTranslation()(TopMenu));
