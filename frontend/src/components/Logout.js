import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import {ROOT} from "../common/paths";

function Logout(props) {

    const logout = () => {
        const {dispatch} = props;
        localStorage.clear();
        dispatch(Api.logout());
    };

    if (props.authenticated) {
        logout();
    }

    return <Redirect to={ROOT} push={true}/>;

}

export default connect(state => ({
    authenticated: state.user.authenticated
}))(Logout);
