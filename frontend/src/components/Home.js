import React from 'react';
import '../App.scss';
import {connect} from "react-redux";

class Home extends React.Component {

    render() {
        return (
            <h5 className='home'>
                {this.props.login? `Hello ${this.props.login}`: "Hello stranger!"}
            </h5>
        );

    }
}

export default connect( state => ({
    login: state.user.login
}))(Home);
