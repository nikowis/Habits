import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {useTranslation} from "react-i18next";
import LoaderView from "../../components/LoaderView";
import PropTypes from "prop-types";
import PaginationComponent from "../PaginationComponent";
import {Button} from "react-bootstrap";
import {Delete, Block} from '@material-ui/icons';


function HabitsView(props) {

    const {t} = useTranslation();
    const {dispatch, habits} = props;

    useEffect(() => {
        if (habits === null) {
            dispatch(Api.getHabits());
        }
    }, [dispatch, habits]);

    const handleDelete = (id) => {
        dispatch(Api.removeHabit(id));
    };

    const actionButtons = (id) => {
        return (<>
            <Button size={'sm'} variant="outline-danger" onClick={() => handleDelete(id)}><Delete/></Button>
        </>);
    };

    const habitRows = () => {
        return props.habits.map((habit) => {
            return (<tr key={habit.id}>
                <td>{habit.title}</td>
                <td>{habit.description}</td>
                <td>{habit.streak}</td>
                <td className={'table-action-buttons'}>{actionButtons(habit.id)}</td>
            </tr>);
        });
    };

    const handlePageChange = (page) => {
        dispatch(Api.getHabits(page));
    };

    const habitTableWithPagination = () => {
        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>{t('title')}</th>
                        <th>{t('description')}</th>
                        <th>{t('streak')}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {habitRows()}
                    </tbody>
                </Table>
                <PaginationComponent currentPage={props.currentPage} totalPages={props.totalPages} onPageChange={handlePageChange}/>
            </>
        );
    };

    const getView = () => {
        return <>{props.habits.length > 0 ? habitTableWithPagination() : t('habits.empty')}</>;
    };

    return (
        <React.Fragment>
            {props.habits === null ? <LoaderView/> : getView()}
        </React.Fragment>
    );
}

HabitsView.propTypes = {
    habits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            streak: PropTypes.number.isRequired
        }),
    ),
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    habits: state.habits.content,
    currentPage: state.habits.currentPage,
    totalPages: state.habits.totalPages,
}))(HabitsView);
