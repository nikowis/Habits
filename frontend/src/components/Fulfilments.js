import React from 'react';
import '../App.scss';
import Api from "./../common/api-communication"
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
            const selectedGoal = this.state.fulfilments.filter((goal) =>
                goal.id.toString() === event.target.id
            )[0];

            Api.fulfilGoal(selectedGoal).payload
                .then(res => {
                    const curFulfilments = this.state.fulfilments;
                    curFulfilments.forEach(g => g.fulfilled = g.id === res.id ? res.fulfilled : g.fulfilled);
                    this.setState({fulfilments: curFulfilments})

                });
        }
    };

    fulfilmentRows = () => {
        return this.state.fulfilments.map((goal) => {
            return (
                <ListGroup.Item key={goal.id}>
                    <Form.Check
                        type='checkbox' checked={goal.fulfilled}
                        id={goal.id}
                        key={goal.id}
                        onChange={this.handleCheckboxChange}
                        label={goal.title + ': ' + goal.description}
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
    }

    render() {
        const {t} = this.props;

        return (
            <React.Fragment>
                <h5>{t('goal.fulfill.title')}</h5>
                {this.state.fulfilments.length > 0 ? this.fulfilmentList() : t('goal.fulfill.empty')}
            </React.Fragment>
        );

    }
}

export default connect()(withTranslation()(Fulfilments));
