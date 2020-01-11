import React from 'react';
import './../App.css';


class TopMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="top-menu">
                {this.headerContent()}
            </div>
        );

    }

    headerContent() {
        if(this.props.login) {
            return "Welcome " + this.props.login;
        } else {
            return "";
        }
    }
}

export default TopMenu;
