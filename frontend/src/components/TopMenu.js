import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import ErrorContainer from "./ErrorContainer";
import Paths from "./../common/paths";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import {LinkContainer} from "react-router-bootstrap"
import {withTranslation} from 'react-i18next';
import {Button} from "react-bootstrap";
import ActionType from '../redux/actions'

class TopMenu extends React.Component {

    changeLang = (lang) => {
        const {i18n, dispatch} = this.props;
        i18n.changeLanguage(lang);
        dispatch({type: ActionType.CHANGE_LANG, payload: lang});
    };

    render() {
        const {t} = this.props;

        return (
            <div className="top-menu">
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Navbar.Brand href={Paths.ROOT}>{t('brand')}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {this.props.authenticated ?
                            <Nav className="mr-auto">
                                <LinkContainer to={Paths.HOME}>
                                    <Nav.Link>{t('home.page')}</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={Paths.CREATE}>
                                    <Nav.Link>{t('habits.create.page')}</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={Paths.FULFILMENTS}>
                                    <Nav.Link>{t('habits.fulfill.page')}</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={Paths.HABITS} exact={true}>
                                    <Nav.Link>{t('habits.page')}</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={Paths.PROFILE}>
                                    <Nav.Link>{t('profile.page')}</Nav.Link>
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
                                    <Nav.Link>{t('login.page')}</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={Paths.REGISTER}>
                                    <Nav.Link>{t('register.page')}</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        }
                    </Navbar.Collapse>

                    {this.props.pendingRequests > 0 ? <Spinner animation="border" variant="primary"/> : null}

                    {this.props.lang !== 'pl' ?
                        <Button variant="outline-info" onClick={() => this.changeLang('pl')}>PL</Button> : null}
                    {this.props.lang !== 'en' ?
                        <Button variant="outline-info" onClick={() => this.changeLang('en')}>EN</Button> : null}

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
    pendingRequests: state.app.pendingRequests,
    lang: state.app.lang
}))(withTranslation()(TopMenu));
