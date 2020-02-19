import store from '../reducers/store';
import ActionType from '../actions/actions';

class HttpUtility {

    constructor() {
        this.token = '';
    }

    call(params, startAction, endAction) {
        const {url, method, payload, headers, json = true} = params;
        if (startAction) {
            store.dispatch({type: startAction});
        }

        return fetch(url, {
            method,
            body: payload ? (json ? JSON.stringify(payload) : payload) : undefined,
            headers: headers ? headers : {Accept: 'application/json', 'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                this.handleError(response);
                return Promise.reject();
            }
        }).finally(() => store.dispatch({type: endAction}));
    }

    handleError(response) {
        let ERROR_NOTIFICATION_DURATION = 5000;
        if (response.status === 401 || response.status === 403) {
            store.dispatch({
                type: ActionType.AUTH_ERROR
                // , payload: response.json()
            });
            setTimeout(() => {
                store.dispatch({type: ActionType.CLEAR_AUTH_ERROR})
            }, ERROR_NOTIFICATION_DURATION)
        } else if(response.status === 400 || response.status === 500){
            store.dispatch({
                type: ActionType.API_ERROR
                // , payload: response.json()
            });
            setTimeout(() => {
                store.dispatch({type: ActionType.CLEAR_API_ERROR})
            }, ERROR_NOTIFICATION_DURATION)
        } else {
            throw new Error(response.json());
        }
    }

    get(params, startAction = ActionType.HTTP_REQUEST_START, endAction = ActionType.HTTP_REQUEST_FINISH) {
        Object.assign(params, {method: 'GET'});
        return this.call(params, startAction, endAction);
    }

    post(params, startAction = ActionType.HTTP_REQUEST_START, endAction = ActionType.HTTP_REQUEST_FINISH) {
        Object.assign(params, {method: 'POST'});
        return this.call(params, startAction, endAction);
    }

    put(params, startAction = ActionType.HTTP_REQUEST_START, endAction = ActionType.HTTP_REQUEST_FINISH) {
        Object.assign(params, {method: 'PUT'});
        return this.call(params, startAction, endAction);
    }

    delete(params, startAction = ActionType.HTTP_REQUEST_START, endAction = ActionType.HTTP_REQUEST_FINISH) {
        Object.assign(params, {method: 'DELETE'});
        return this.call(params, startAction, endAction);
    }

    buildQueryParams(queryParams) {
        return Object.keys(queryParams)
            .reduce((query, param) => [...query, encodeURIComponent(param) + '=' + encodeURIComponent(queryParams[param])], [])
            .join('&');
    }

}

export default HttpUtility = new HttpUtility();
