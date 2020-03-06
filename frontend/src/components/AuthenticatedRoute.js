import React from 'react';
import '../App.scss';
import {Redirect, Route} from "react-router-dom";
import Paths from "../common/paths";

export default function AuthenticatedRoute({ children, authenticated, ...rest }) {
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