import React from 'react';
import '../App.scss';
import {withTranslation} from "react-i18next";
import {withRouter} from 'react-router-dom';
import Paths from "./../common/paths";

class TitleHeader extends React.Component {

    translationKey(t, pathname) {
        let key = pathname.substring(1);
        if (!key) {
            key = Paths.HOME.substring(1);
        }
        key = key.replace('/', '.')
        return t(key + '.title')

    }

    render() {
        const {t, location} = this.props;

        let pageTitle = this.translationKey(t, location.pathname);
        return (
            <div className="title-header">
                {pageTitle ? <h5>{pageTitle}</h5> : null}
            </div>
        );
    }
}


export default withRouter(withTranslation()(TitleHeader));
