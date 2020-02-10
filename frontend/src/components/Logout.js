import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import ActionType from "../actions/actions";
import Api from "../common/api-communication";
import {connect} from "react-redux";


class Logout extends React.Component {

    logout = () => {
        const {dispatch} = this.props;
        localStorage.clear();
        document.cookie = "JSESSIONID=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
        Api.logout();
        dispatch({
            type: ActionType.LOGOUT_ACTION
        });
        window.location.reload();
    };

    render() {
        if (this.props.authenticated) {
            this.logout();
        } else {
            return <Redirect to='/' push={true}/>;
        }
    }
}

export default connect(state => ({
    authenticated: state.app.authenticated
}))(Logout);
