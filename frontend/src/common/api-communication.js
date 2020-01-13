import {API_GOALS} from './constants'

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
    }

    createGoal(goal) {
        return fetch(this.API_URL + API_GOALS, {
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


    getGoals(login) {
        return fetch(this.API_URL + API_GOALS)
            .then(res => res.json())
            .catch(console.log)
    };
}

export default Api = new Api();