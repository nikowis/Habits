import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {withTranslation} from "react-i18next";

class Goals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {goals: []};
    }

    componentDidMount() {
        Api.getGoals().payload.then((response) => {
            this.setState({goals: response})
        });
    }

    goalRows = () => {
        return this.state.goals.map((goal) => {
            return (<tr key={goal.id}>
                <td>{goal.id}</td>
                <td>{goal.title}</td>
                <td>{goal.description}</td>
            </tr>);
        });
    };

    goalTable = () => {
        const { t } = this.props;

        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>{t('goals.idCol')}</th>
                    <th>{t('goals.titleCol')}</th>
                    <th>{t('goals.descCol')}</th>
                </tr>
                </thead>
                <tbody>
                {this.goalRows()}
                </tbody>
            </Table>
        );
    };


    render() {
        const { t } = this.props;

        return (
            <React.Fragment>
                {this.state.goals.length > 0 ? this.goalTable() :  t('goals.empty')}
            </React.Fragment>
        );
    }
}

export default connect()(withTranslation()(Goals));
