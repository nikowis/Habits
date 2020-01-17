import React from 'react';
import '../App.scss';


class Input extends React.Component {

    render() {
        return (
            <label className="input">
                {this.props.label}
                <input type={this.props.type}
                       onChange={this.props.onChange}
                       value={this.props.value}
                       {...this.props}
                />
            </label>
        );

    }

}

export default Input;
