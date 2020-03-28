import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import {useTranslation} from "react-i18next";
import FulfillableHabit from "./FulfilmentsRow";
import LoaderView from "../../components/LoaderView";
import PropTypes from "prop-types";
import PaginationComponent from "../PaginationComponent";
import {withRouter} from 'react-router-dom';

function FulfilmentsView(props) {

    const {t} = useTranslation();
    const {dispatch, fulfilments, location, history, currentPage, totalPages, streakGoal} = props;
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
        if (fulfilments === null || (pageQuery !== currentPage)) {
            dispatch(Api.getFulfilments(pageQuery - 1));
        }
    }, [dispatch, fulfilments, currentPage, pageQuery]);

    const handleCheckboxChange = (event) => {
        const {dispatch} = props;
        if (event.target.checked) {
            const selectedHabit = fulfilments.filter((habit) =>
                habit.id.toString() === event.target.id
            )[0];
            dispatch(Api.fulfilHabit(selectedHabit));
        }
    };

    const fulfilmentRows = () => {
        return fulfilments.map((habit) => {
            return (
                <ListGroup.Item key={habit.id}>
                    <FulfillableHabit streakGoal={streakGoal} habit={habit}
                                      handleChange={handleCheckboxChange}/>
                </ListGroup.Item>
            );
        });
    };

    const handlePageChange = (page) => {
        history.push({
            pathname: pathname,
            search: "?" + new URLSearchParams({page: page}).toString()
        })
    };

    const fulfilmentList = () => {
        return (
            <>
                <ListGroup className="fulfilment-list">
                    {fulfilmentRows()}
                </ListGroup>
                <PaginationComponent currentPage={currentPage} totalPages={totalPages}
                                     onPageChange={handlePageChange}/>
            </>
        );
    };

    const getView = () => {
        return <>{pageQuery <= totalPages ? fulfilmentList() : t('noElementsFound')}</>;
    };

    return (
        <React.Fragment>
            {fulfilments === null ? <LoaderView/> : getView()}
        </React.Fragment>
    );
}

FulfilmentsView.propTypes = {
    fulfilments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            fulfilled: PropTypes.bool.isRequired
        }),
    ),
    streakGoal: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    fulfilments: state.fulfilments.content,
    streakGoal: state.user.streakGoal,
    currentPage: state.fulfilments.currentPage,
    totalPages: state.fulfilments.totalPages,
}))(withRouter(FulfilmentsView));
