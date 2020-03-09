import ApiEndpoint from './endpoints'
import HttpUtility from './http-utility'
import ActionType from './../redux/actions'

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
    }

    createGoal(goal) {
        let url = this.API_URL + ApiEndpoint.API_GOALS;

        return HttpUtility.post({
            url: url,
            payload: goal,
        });
    };

    postLogin(login, password) {
        let url = this.API_URL + ApiEndpoint.API_LOGIN;
        return HttpUtility.post({
            url: url,
            payload: {
                username: login,
                password: password
            },
            action: ActionType.LOGIN_ACTION
        });
    };

    logout() {
        let url = this.API_URL + ApiEndpoint.API_LOGOUT;

        return HttpUtility.post({
            url: url,
            action: ActionType.LOGOUT_ACTION
        });
    };

    getGoals() {
        const url = new URL(this.API_URL + ApiEndpoint.API_GOALS);
        return HttpUtility.get({
            url: url,
        });
    };

    getFulfilments() {
        const url = new URL(this.API_URL + ApiEndpoint.API_FULFILMENTS);
        return HttpUtility.get({
            url: url
        });
    };

    getMe() {
        const url = new URL(this.API_URL + ApiEndpoint.API_ME);
        return HttpUtility.get({
            url: url,
            action: ActionType.LOGIN_ACTION
        });
    };

    fulfilGoal(goal) {
        const url = new URL(this.API_URL + ApiEndpoint.API_FULFILMENTS);
        return HttpUtility.post({
            url: url,
            payload: {goalId: goal.id}
        });
    }


    postRegister(login, password) {
        let url = this.API_URL + ApiEndpoint.API_REGISTER;
        return HttpUtility.post({
            url: url,
            payload: {
                username: login,
                password: password
            },
            action: ActionType.REGISTER_ACTION
        });
    }
}

export default Api = new Api();