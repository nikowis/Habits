import {API_FULFILMENTS, API_HABITS, API_LOGIN, API_LOGOUT, API_REGISTER, API_USER} from './endpoints'
import HttpUtility from './http-utility'
import {
    FETCH_FULFILMENTS,
    FETCH_HABITS,
    FETCH_USER,
    FULFIL_HABIT,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    REGISTER_ACTION,
    UPDATE_USER
} from "../redux/actions";

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
    }

    createHabit(habit) {
        let url = this.API_URL + API_HABITS;

        return HttpUtility.post({
            url: url,
            payload: habit,
        });
    };

    postLogin(login, password) {
        let url = this.API_URL + API_LOGIN;
        return HttpUtility.post({
            url: url,
            payload: {
                login: login,
                password: password
            },
            action: LOGIN_ACTION
        });
    };

    logout() {
        let url = this.API_URL + API_LOGOUT;

        return HttpUtility.post({
            url: url,
            action: LOGOUT_ACTION
        });
    };

    getHabits() {
        const url = new URL(this.API_URL + API_HABITS);
        return HttpUtility.get({
            url: url,
            action: FETCH_HABITS
        });
    };

    getFulfilments() {
        const url = new URL(this.API_URL + API_FULFILMENTS);
        return HttpUtility.get({
            url: url,
            action: FETCH_FULFILMENTS
        });
    };

    fulfilHabit(habit) {
        const url = new URL(this.API_URL + API_FULFILMENTS);
        return HttpUtility.post({
            url: url,
            payload: {habitId: habit.id},
            action: FULFIL_HABIT
        });
    }


    postRegister(login, password) {
        let url = this.API_URL + API_REGISTER;
        return HttpUtility.post({
            url: url,
            payload: {
                login: login,
                password: password
            },
            action: REGISTER_ACTION
        });
    }

    getUser() {
        const url = new URL(this.API_URL + API_USER);
        return HttpUtility.get({
            url: url,
            action: FETCH_USER
        });
    };

    updateUser(streakGoal, password) {
        let url = this.API_URL + API_USER;
        return HttpUtility.put({
            url: url,
            payload: {
                streakGoal: streakGoal,
                password: password
            },
            action: UPDATE_USER
        });
    }

}

export default Api = new Api();