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
            action: ActionType.FETCH_HABITS
        });
    };

    getFulfilments() {
        const url = new URL(this.API_URL + ApiEndpoint.API_FULFILMENTS);
        return HttpUtility.get({
            url: url,
            action: ActionType.FETCH_FULFILMENTS
        });
    };

    fulfilHabit(habit) {
        const url = new URL(this.API_URL + ApiEndpoint.API_FULFILMENTS);
        return HttpUtility.post({
            url: url,
            payload: {habitId: habit.id},
            action: ActionType.FULFIL_HABIT
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

    getUser() {
        const url = new URL(this.API_URL + ApiEndpoint.API_USER);
        return HttpUtility.get({
            url: url,
            action: ActionType.FETCH_USER
        });
    };

    updateUser(streakGoal, password) {
        let url = this.API_URL + ApiEndpoint.API_USER;
        return HttpUtility.put({
            url: url,
            payload: {
                streakGoal: streakGoal,
                password: password
            },
            action: ActionType.UPDATE_USER
        });
    }

}

export default Api = new Api();