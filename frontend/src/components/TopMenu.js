import React from 'react';
import '../App.scss';
import {Link} from "react-router-dom";


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

        return (<div>
                <nav className="navigation">
                    {this.props.login ? null : <Link to="/login">Login</Link>}
                    {this.props.login ? <Link to="/home">Home</Link> : null}
                    {this.props.login ? <Link to="/create">Create</Link> : null}
                    {this.props.login ? <Link to="/fulfil">Fulfil</Link> : null}
                </nav>
                <div className="welcome-message">
                    {this.props.login ? "Welcome " + this.props.login : null}
                </div>
            </div>
        );
    }
}

export default TopMenu;
