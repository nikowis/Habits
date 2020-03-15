import ApiEndpoint from './endpoints'
import HttpUtility from './http-utility'
import ActionType from './../redux/actions'

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
    }

    createHabit(habit) {
        let url = this.API_URL + ApiEndpoint.API_HABITS;

        return HttpUtility.post({
            url: url,
            payload: habit,
        });
    };

    postLogin(login, password) {
        let url = this.API_URL + ApiEndpoint.API_LOGIN;
        return HttpUtility.post({
            url: url,
            payload: {
                login: login,
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

    getHabits() {
        const url = new URL(this.API_URL + ApiEndpoint.API_HABITS);
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

    fulfilHabit(habit) {
        const url = new URL(this.API_URL + ApiEndpoint.API_FULFILMENTS);
        return HttpUtility.post({
            url: url,
            payload: {habitId: habit.id}
        });
    }


    postRegister(login, password) {
        let url = this.API_URL + ApiEndpoint.API_REGISTER;
        return HttpUtility.post({
            url: url,
            payload: {
                login: login,
                password: password
            },
            action: ActionType.REGISTER_ACTION
        });
    }

}

export default Api = new Api();