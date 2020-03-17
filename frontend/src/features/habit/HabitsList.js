import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {withTranslation} from "react-i18next";

class HabitsList extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(Api.getHabits());
    }

    habitRows = () => {
        return this.props.habits.map((habit) => {
            return (<tr key={habit.id}>
                <td>{habit.id}</td>
                <td>{habit.title}</td>
                <td>{habit.description}</td>
            </tr>);
        });
    };

    habitTable = () => {
        const { t } = this.props;

        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>{t('id')}</th>
                    <th>{t('title')}</th>
                    <th>{t('description')}</th>
                </tr>
                </thead>
                <tbody>
                {this.habitRows()}
                </tbody>
            </Table>
        );
    };


    render() {
        const { t } = this.props;

        return (
            <React.Fragment>
                {this.props.habits.length > 0 ? this.habitTable() :  t('habits.empty')}
            </React.Fragment>
        );
    }
}

export default connect(state => ({
    habits: state.data.habits,
}))(withTranslation()(HabitsList));
