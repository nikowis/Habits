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

function FulfilmentsView(props) {

    const {t} = useTranslation();
    const {dispatch, fulfilments} = props;

    useEffect(() => {
        if (fulfilments === null) {
            dispatch(Api.getFulfilments());
        }
    }, [dispatch, fulfilments]);

    const handleCheckboxChange = (event) => {
        const {dispatch} = props;
        if (event.target.checked) {
            const selectedHabit = props.fulfilments.filter((habit) =>
                habit.id.toString() === event.target.id
            )[0];
            dispatch(Api.fulfilHabit(selectedHabit));
        }
    };

    const fulfilmentRows = () => {
        return props.fulfilments.map((habit) => {
            return (
                <ListGroup.Item key={habit.id}>
                    <FulfillableHabit streakGoal={props.streakGoal} habit={habit}
                                      handleChange={handleCheckboxChange}/>
                </ListGroup.Item>
            );
        });
    };

    const handlePageChange = (page) => {
        dispatch(Api.getFulfilments(page));
    };

    const fulfilmentList = () => {
        return (
            <>
                <ListGroup className="fulfilment-list">
                    {fulfilmentRows()}
                </ListGroup>
                <PaginationComponent currentPage={props.currentPage} totalPages={props.totalPages}
                                     onPageChange={handlePageChange}/>
            </>
        );
    };

    const getView = () => {
        return <>{props.fulfilments.length > 0 ? fulfilmentList() : t('habits.fulfill.empty')}</>;
    };

    return (
        <React.Fragment>
            {props.loading || props.fulfilments === null ? <LoaderView/> : getView()}
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
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

export default connect(state => ({
    fulfilments: state.data.fulfilments.content,
    streakGoal: state.user.streakGoal,
    loading: state.data.fulfilments.loading,
    currentPage: state.data.fulfilments.currentPage,
    totalPages: state.data.fulfilments.totalPages,
}))(FulfilmentsView);
