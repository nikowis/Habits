import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import {useTranslation} from "react-i18next";
import FulfillableHabit from "./FulfilmentsRow";
import LoaderView from "../../components/LoaderView";

function FulfilmentsView(props) {

    const {t} = useTranslation();

    useEffect(() => {
        if (props.fulfilments === null) {
            props.dispatch(Api.getFulfilments());
        }
    }, [props.fulfilments]);

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

    const fulfilmentList = () => {
        return (
            <ListGroup className="fulfilment-list">
                {fulfilmentRows()}
            </ListGroup>
        );
    };

    const getView = () => {
        return <>{props.fulfilments.length > 0 ? fulfilmentList() : t('habits.fulfill.empty')}</>;
    };

    return (
        <React.Fragment>
            {props.fulfilments !== null ? getView() : <LoaderView/>}
        </React.Fragment>
    );
}

export default connect(state => ({
    fulfilments: state.data.fulfilments,
    streakGoal: state.user.streakGoal
}))(FulfilmentsView);
