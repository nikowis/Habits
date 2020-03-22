import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {useTranslation} from "react-i18next";
import LoaderView from "../../components/LoaderView";
import PropTypes from "prop-types";

function HabitsView(props) {

    const {t} = useTranslation();
    const {dispatch, habits} = props;

    useEffect(() => {
        if (habits === null) {
            dispatch(Api.getHabits());
        }
    }, [dispatch, habits]);


    const habitRows = () => {
        return props.habits.map((habit) => {
            return (<tr key={habit.id}>
                <td>{habit.id}</td>
                <td>{habit.title}</td>
                <td>{habit.description}</td>
            </tr>);
        });
    };

    const habitTable = () => {
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
                {habitRows()}
                </tbody>
            </Table>
        );
    };

    const getView = () => {
        return <>{props.habits.length > 0 ? habitTable() : t('habits.empty')}</>;
    };

    return (
        <React.Fragment>
            {props.habits !== null ? getView() : <LoaderView/>}
        </React.Fragment>
    );
}

HabitsView.propTypes = {
    habits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    )
};

export default connect(state => ({
    habits: state.data.habits,
}))(HabitsView);
