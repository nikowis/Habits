import React, {useEffect} from 'react';
import '../App.scss';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import Api from "../common/api-communication";
import LoaderView from "./LoaderView";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {CREATE, FULFILMENTS, LOGIN, REGISTER} from "../common/paths";
import {withRouter} from "react-router-dom";

function HomeView(props) {

    const {t} = useTranslation();
    const {dispatch, authenticated, login} = props;

    useEffect(() => {
        if (authenticated && login === null) {
            dispatch(Api.getUser());
        }
    }, [dispatch, authenticated, login]);

    const redirect = (to) => {
        console.log('REDIRECT', to);
        props.history.push(to);
    };

    const unauthenticatedBtns = () => {
        return <>
            <Button variant="primary" type="submit" onClick={() => redirect(REGISTER)}>
                {t('register.submit')}
            </Button>
            <Button variant="primary" type="submit" onClick={() => redirect(LOGIN)}>
                {t('login.submit')}
            </Button>
        </>;
    };

    const fulfillBtn = () => {
        return <Button variant="primary" type="submit" onClick={() => redirect(FULFILMENTS)}>
            {t('habits.fulfill.submit')}
        </Button>;
    };

    const createBtn = () => {
        return <Button variant="primary" type="submit" onClick={() => redirect(CREATE)}>
            {t('habits.create.submit')}
        </Button>;
    };


    const actionButton = () => {
        return (
            <span className='quick-action-btns'>
                {!props.authenticated ?
                    unauthenticatedBtns() :
                    (
                        props.habits !== null && props.habits.length > 0 ?
                            fulfillBtn() :
                            createBtn()
                    )
                }
            </span>
        )
    };

    const actionDescription = () => {
        return <div className='quick-action-desc'>
            {!props.authenticated ?
                t('home.unauthenticatedMonit') :
                (
                    props.habits !== null && props.habits.length > 0 ?
                        t('home.fulfillMonit') :
                        t('home.noHabitsMonit')
                )
            }
        </div>;
    };

    const getView = () => {
        return (
            <>
                <h5 className='home'>
                    {props.login ? t('home.title', {'name': props.login}) : t('home.title', {'name': t('home.stranger')})}
                </h5>
                <div className='app-description'>
                    {t('home.appDescription')}
                </div>
                {actionDescription()}
                {actionButton()}
            </>
        );
    };


    return (
        <>
            {!props.authenticated || (props.authenticated && props.login) ? getView() :
                <LoaderView/>}
        </>
    );


}

HomeView.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    login: PropTypes.string
};

export default connect(state => ({
    authenticated: state.user.authenticated,
    login: state.user.login,
    habits: state.habits.content,
}))(withRouter(HomeView));
