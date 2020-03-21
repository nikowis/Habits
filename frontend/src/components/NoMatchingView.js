import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Paths from './../common/paths'

export default function NoMatchingView() {
    return (
        <Redirect to={Paths.ROOT} push={false}/>
    )
}
