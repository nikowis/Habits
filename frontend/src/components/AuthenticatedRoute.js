import React from 'react';
import '../App.scss';
import {Redirect, Route} from "react-router-dom";
import Paths from "../common/paths";
import {connect} from "react-redux";

function AuthenticatedRoute({ children, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: Paths.LOGIN,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(AuthenticatedRoute);
