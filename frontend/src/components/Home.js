import React from 'react';
import '../App.scss';
import {connect} from "react-redux";

class Home extends React.Component {

    render() {
        return (
            <div className='home'>
                Hello {this.props.login}
            </div>
        );

    }
}

export default connect( state => ({
    login: state.user.login
}))(Home);
