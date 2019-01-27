import {takeLatest, put, call} from 'redux-saga/effects';

import {
    SCATTER_ACTIONS,
    connectedScatter,
    connectionError,
    logInSuccess,
} from './scatter_actions';

import {
    connect,
    login,
    loginHistoryExists
} from "./scatter_helper";

const APP_NAME = 'React-Scatter';

function* connectWithScatter(){
    try{
        yield call(connect,APP_NAME);
        yield put(connectedScatter());
    }catch(e){
        yield put(connectionError());
    }
}

function* attemptAutoLoginWithScatter(){
    try{
        if(loginHistoryExists()){
            yield call(connect,APP_NAME);
            yield put(connectedScatter());
            const {name, publicKey, authority} = yield call(login);
            yield put(logInSuccess({name, publicKey, keyType: authority}));
        }
    }catch(e){
        console.info("auto login failed", e)
    }
}

export default function*  missionsSagas(){
    yield takeLatest(SCATTER_ACTIONS.CONNECT, connectWithScatter);
    yield takeLatest(SCATTER_ACTIONS.ATTEMPT_AUTO_LOGIN, attemptAutoLoginWithScatter);
}