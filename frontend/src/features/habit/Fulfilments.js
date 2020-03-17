import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import {withTranslation} from "react-i18next";
import FulfillableHabit from "./FulfilmentsRow";

class Fulfilments extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(Api.getFulfilments());
    }

    handleCheckboxChange = (event) => {
        const {dispatch} = this.props;
        if (event.target.checked) {
            const selectedHabit = this.props.fulfilments.filter((habit) =>
                habit.id.toString() === event.target.id
            )[0];
            dispatch(Api.fulfilHabit(selectedHabit));
        }
    };

    fulfilmentRows = () => {
        return this.props.fulfilments.map((habit) => {
            return (
                <ListGroup.Item key={habit.id}>
                    <FulfillableHabit habit={habit} handleChange={this.handleCheckboxChange}/>
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
                {this.props.fulfilments.length > 0 ? this.fulfilmentList() : t('habits.fulfill.empty')}
            </React.Fragment>
        );

    }
}

export default connect(state => ({
    fulfilments: state.data.fulfilments,
}))(withTranslation()(Fulfilments));
