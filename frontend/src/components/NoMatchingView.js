import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import {ROOT} from "../common/paths";

export default function NoMatchingView() {
    return (
        <Redirect to={ROOT} push={false}/>
    )
}
