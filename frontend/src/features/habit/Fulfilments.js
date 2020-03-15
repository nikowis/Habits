import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import {withTranslation} from "react-i18next";

class Fulfilments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {fulfilments: []};
    }

    componentDidMount() {
        Api.getFulfilments().payload.then((response) => {
            this.setState({fulfilments: response})
        });
    }

    handleCheckboxChange = (event) => {
        if (event.target.checked) {
            const selectedHabit = this.state.fulfilments.filter((habit) =>
                habit.id.toString() === event.target.id
            )[0];

            Api.fulfilHabit(selectedHabit).payload
                .then(res => {
                    const curFulfilments = this.state.fulfilments;
                    curFulfilments.forEach(g => g.fulfilled = g.id === res.id ? res.fulfilled : g.fulfilled);
                    this.setState({fulfilments: curFulfilments})

                });
        }
    };

    fulfilmentRows = () => {
        return this.state.fulfilments.map((habit) => {
            const label = habit.title + (habit.description ? ': ' + habit.description : '');

            return (
                <ListGroup.Item key={habit.id}>
                    <Form.Check
                        type='checkbox' checked={habit.fulfilled}
                        id={habit.id}
                        key={habit.id}
                        onChange={this.handleCheckboxChange}
                        label={label}
                    />
                </ListGroup.Item>
            );
        });
    };

    fulfilmentList = () => {
        return (
            <ListGroup className="fulfilment-list">
                {this.fulfilmentRows()}
            </ListGroup>
        );
    };

    render() {
        const {t} = this.props;

        return (
            <React.Fragment>
                {this.state.fulfilments.length > 0 ? this.fulfilmentList() : t('habits.fulfill.empty')}
            </React.Fragment>
        );

    }
}

export default connect()(withTranslation()(Fulfilments));
