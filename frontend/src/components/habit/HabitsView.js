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
import {Delete} from '@material-ui/icons';
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {store} from "../../index";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {withRouter} from 'react-router-dom';

function HabitsView(props) {

    const {t} = useTranslation();
    const {dispatch, habits, location, history, currentPage, totalPages} = props;
    const {search, pathname} = location;
    const {replace} = history;

    const pageQuery = Api.getPageParam(search);
    useEffect(() => {
        if (!pageQuery || Number.isNaN(pageQuery)) {
            replace({
                pathname: pathname,
                search: "?" + new URLSearchParams({page: 1}).toString()
            })
        }
    }, [replace, pathname, pageQuery]);

    useEffect(() => {
        if (!pageQuery || Number.isNaN(pageQuery)) {
            return;
        }
        if (habits === null || (pageQuery !== currentPage)) {
            dispatch(Api.getHabits(pageQuery - 1));
        }
    }, [dispatch, habits, currentPage, pageQuery]);

    const handleDelete = (id) => {
        dispatch(Api.removeHabit(id)).then(res => {
            if (res.action.payload && !res.action.payload.status) {
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.habitDeleted')});
                setTimeout(() => {
                    store.dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
            }
        });
    };

    const habitRows = () => {
        return habits.map((habit) => {
            return (<tr key={habit.id}>
                <td>{habit.title}</td>
                <td>{habit.description}</td>
                <td>{habit.streak}</td>
                <td className={'table-action-buttons'}>
                    <Button size={'sm'} variant="outline-danger"
                            onClick={() => handleDelete(habit.id)}><Delete/></Button>
                </td>
            </tr>);
        });
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
                <PaginationComponent currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/>
            </>
        );
    };

    const getView = () => {
        return <>{pageQuery <= totalPages ? habitTableWithPagination() : t('noElementsFound')}</>;
    };

    return (
        <React.Fragment>
            {habits === null ? <LoaderView/> : getView()}
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
}))(withRouter(HabitsView));
