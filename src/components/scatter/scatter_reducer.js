import {SCATTER_ACTIONS} from './scatter_actions';

const INITIAL_STATE = {
    connected       : false,
    connecting      : false,
    connectionError : false,

    loggedIn        : false,
    requestedLogIn  : false,
    loginFailed     : false,

    userAccount     : null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SCATTER_ACTIONS.CONNECT:
            return {...state, connecting: true,};

        case SCATTER_ACTIONS.CONNECTED:
            return {...state, connected: true, connectionError: false};

        case SCATTER_ACTIONS.CONNECTION_ERROR:
            return {...state, connectionError: true};

        case SCATTER_ACTIONS.LOGGED_IN:
            return {...state, loggedIn: true, loginFailed: false, userAccount: action.payload};

        default:
            return state;
    }
};

export default reducer;