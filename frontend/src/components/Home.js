import React from 'react';
import '../App.scss';
import {connect} from "react-redux";

class Home extends React.Component {

    render() {
        return (
            <h3 className='home'>
                {this.props.login? `Hello ${this.props.login}`: "Hello stranger!"}
            </h3>
        );

    }
}

export default connect( state => ({
    login: state.user.login
}))(Home);
