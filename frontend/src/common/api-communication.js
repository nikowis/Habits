import ApiEndpoint from './endpoints'
import HttpUtility from './http-utility'

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
    }

    createGoal(goal) {
        let url = this.API_URL + ApiEndpoint.API_GOALS;

        return HttpUtility.post({
            url: url,
            payload: goal
        });
    };

    postLogin(login, password) {
        let url = this.API_URL + ApiEndpoint.API_LOGIN;

        const data = new URLSearchParams();
        data.append('username', login);
        data.append('password', password);

        return HttpUtility.post({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            payload: data,
            json: false
        });
    };

    getGoals() {
        const url = new URL(this.API_URL + ApiEndpoint.API_GOALS);
        return HttpUtility.get({
            url: url
        });
    };

    getMe() {
        const url = new URL(this.API_URL + ApiEndpoint.API_ME);
        return HttpUtility.get({
            url: url
        });
    };

    fulfilGoal(goal) {
        const url = new URL(this.API_URL + ApiEndpoint.API_FULFILMENTS);
        return HttpUtility.post({
            url: url,
            payload: {goalId: goal.id}
        });
    }
}

export default Api = new Api();