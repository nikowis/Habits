import ApiEndpoint from './endpoints'

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
    }

    createGoal(goal) {
        let url = this.API_URL + ApiEndpoint.API_GOALS;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(goal)
        })
            .then((response) => {
                return response.json();
            })
            .catch(console.log)
    };

    postLogin(login, password) {
        let url = this.API_URL + ApiEndpoint.API_LOGIN;
        var data = new URLSearchParams();
        data.append('username', login);
        data.append('password', password);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: data
        }).then((response) => {
            return response.json();
        }).catch(console.log)
    };

    getGoals() {
        const url = new URL(this.API_URL + ApiEndpoint.API_GOALS);

        return fetch(url, {credentials: 'include'})
            .then(res => res.json())
            .catch(console.log)
    };

    getMe() {
        const url = new URL(this.API_URL + ApiEndpoint.API_ME);
        return fetch(url, {credentials: 'include'}).catch(console.log);
    };

    fulfilGoal(goal) {
        const url = new URL(this.API_URL + ApiEndpoint.API_FULFILMENTS);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                goalId: goal.id,
            })
        }).then(res => res.json())
            .catch(console.log)
    }
}

export default Api = new Api();