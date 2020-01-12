const Api = {
    createGoal: function (goal) {
        return fetch('http://localhost:8080/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(goal)
        })
        .then((response) => {
            return response.json();
        })
    },


};

export default Api;