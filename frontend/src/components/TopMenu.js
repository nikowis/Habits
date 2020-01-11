import React from 'react';
import './../App.css';
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
                <nav>
                    {this.props.login ? null : <Link to="/login">Login</Link>}
                    {this.props.login ? <Link to="/home">Home</Link> : null}
                    {this.props.login ? <Link to="/create">Create</Link> : null}
                    {this.props.login ? <Link to="/fulfil">Fulfil</Link> : null}
                    {this.props.login ? "Welcome " + this.props.login : null}
                </nav>
            </div>
        );
    }
}

export default TopMenu;
