import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";

class Home extends React.Component {

    render() {
        const {t} = this.props;

        return (
            <h5 className='home'>
                {this.props.login? t('home.title', {'name': this.props.login}): t('home.title', {'name': 'stranger'})}
            </h5>
        );

    }
}

export default connect(state => ({
    login: state.user.login
}))(withTranslation()(Home));
