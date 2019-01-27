export const SCATTER_ACTIONS = {
    ATTEMPT_AUTO_LOGIN  : 'SCATTER/AUTO_LOGIN',

    CONNECT         : 'SCATTER/CONNECT',
    CONNECTED       : 'SCATTER/CONNECTED',
    CONNECTION_ERROR: 'SCATTER/ERRORS/CONNECTION_ERROR',

    LOGIN      : 'SCATTER/LOGIN',
    LOGGED_IN  : 'SCATTER/LOGGED_IN',
    LOGIN_ERROR: 'SCATTER/ERRORS/LOGIN_ERROR',

    GET_WALLET: 'SCATTER/GET_WALLET',

    SEND_TOKEN: 'SCATTER/SEND_TOKEN',
    AUTH_ERROR: 'SCATTER/ERRORS/AUTH_ERROR',
    SEND_TOKEN_ERROR: 'SCATTER/ERRORS/SEND_TOKEN_ERROR',
};

export const attemptAutoLogin  = () => ({type: SCATTER_ACTIONS.ATTEMPT_AUTO_LOGIN});

export const connectScatter    = () => ({type: SCATTER_ACTIONS.CONNECT});
export const connectedScatter  = () => ({type: SCATTER_ACTIONS.CONNECTED});
export const connectionError   = () => ({type: SCATTER_ACTIONS.CONNECTION_ERROR});

export const logInSuccess      = payload => ({type: SCATTER_ACTIONS.LOGGED_IN, payload});

