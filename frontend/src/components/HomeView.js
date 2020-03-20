import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import Api from "../common/api-communication";
import LoaderView from "./LoaderView";

class HomeView extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.authenticated) {
            dispatch(Api.getUser());
        }
    }

    getView() {
        const {t} = this.props;
        return (
            <h5 className='home'>
                {this.props.login ? t('home.title', {'name': this.props.login}) : t('home.title', {'name': t('home.stranger')})}
            </h5>
        );
    }

    render() {
        return (
            <>
                {!this.props.authenticated || (this.props.authenticated && this.props.login) ? this.getView() :
                    <LoaderView/>}
            </>
        );
    }

}

export default connect(state => ({
    authenticated: state.user.authenticated,
    login: state.user.login
}))(withTranslation()(HomeView));
