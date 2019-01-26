import {SCATTER_ACTIONS} from './scatter_actions';

const INITIAL_STATE = {
    connected       : false,
    connecting      : false,
    connectionError : false,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SCATTER_ACTIONS.CONNECT:
            return {...state, connecting: true,};

        case SCATTER_ACTIONS.CONNECTED:
            return {...state, connected: true};

        case SCATTER_ACTIONS.CONNECTION_ERROR:
            return {...state, connectionError: true};

        default:
            return state;
    }
};

export default reducer;