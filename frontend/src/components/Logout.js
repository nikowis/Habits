import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import Paths from './../common/paths'

class Logout extends React.Component {

    logout = () => {
        const {dispatch} = this.props;
        localStorage.clear();
        dispatch(Api.logout());
    };

    render() {
        if (this.props.authenticated) {
            this.logout();
        }
        return <Redirect to={Paths.ROOT} push={true}/>;
    }
}

export default connect(state => ({
    authenticated: state.user.authenticated
}))(Logout);
