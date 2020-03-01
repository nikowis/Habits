import React from 'react';
import '../App.scss';
import {connect} from "react-redux";

class Home extends React.Component {

    render() {
        return (
            <h3 className='home'>
                Hello {this.props.login}
            </h3>
        );

    }
}

export default connect( state => ({
    login: state.user.login
}))(Home);
