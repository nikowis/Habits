import {API_GOALS, API_FULFILMENTS, API_LOGIN} from './constants'

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
    }

    createGoal(goal) {
        let url = this.API_URL + API_GOALS;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(goal)
        })
            .then((response) => {
                return response.json();
            })
            .catch(console.log)
    };

    postLogin(login, password) {
        let url = this.API_URL + API_LOGIN;
        var data = new URLSearchParams();
        data.append('username', login);
        data.append('password', password);

        return fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body: data
        }).then((response) => {
            return response.json();
        }).catch(console.log)
    };

    getGoals(login) {
        const url = new URL(this.API_URL + API_GOALS);
        const params = {login: login};
        url.search = new URLSearchParams(params).toString();

        return fetch(url)
            .then(res => res.json())
            .catch(console.log)
    };

    fulfilGoal(login, goal) {
        const url = new URL(this.API_URL + API_FULFILMENTS);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                goalId: goal.id,
                login: login
            })
        }).then(res => res.json())
        .catch(console.log)
    }
}

export default Api = new Api();