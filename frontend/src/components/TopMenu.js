import React from 'react';
import './../App.css';


class TopMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="top-menu">
                Welcome {this.props.login}
            </div>
        );

    }
}

export default TopMenu;
