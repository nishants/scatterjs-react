import {takeLatest, put, call} from 'redux-saga/effects';

import {
    SCATTER_ACTIONS,
    connectedScatter,
    logInSuccess,
    connectionError,
    loginError,
    setWallet,
    errorGettingWallet
} from './scatter_actions';

import {
    connect,
    login,
    loginHistoryExists,
    getWallet
} from "./scatter_helper";

import {
    notifyError,
    notifyInfo,
    notifySuccess,
    notifyWarning
} from "../utils";

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
            try{
                const {name, publicKey, authority} = yield call(login);
                yield put(logInSuccess({name, publicKey, keyType: authority}));
                notifySuccess(`Logged in as ${name}`, 1);
            }catch (e) {
                console.error(e)
                notifyError('Scatter rejected login request !', 3);
            }
        }
    }catch(e){
        notifyInfo('Please unlock Scatter !', 3);
    }
}

function* loginWithScatter(){
    try{
        yield call(connect,APP_NAME);
        yield put(connectedScatter());

        try{
            const {name, publicKey, authority} = yield call(login);
            yield put(logInSuccess({name, publicKey, keyType: authority}));
            notifySuccess(`Logged in as ${name}`, 1);
        }catch(e){
            yield put(loginError());
            notifyError('Scatter rejected login request !', 3);
        }
    }catch(e){
        yield put(connectionError());
        notifyError('Please unlock Scatter !', 3);
    }
}

function* fetchUserWallet(){
    try{
        const wallet = yield call(getWallet);
        yield put(setWallet(wallet));
    }catch(e){
        yield put(errorGettingWallet({message: e.message}));
        notifyError('Error fetching wallet !', 3);
    }
}

export default function*  missionsSagas(){
    yield takeLatest(SCATTER_ACTIONS.CONNECT, connectWithScatter);
    yield takeLatest(SCATTER_ACTIONS.ATTEMPT_AUTO_LOGIN, attemptAutoLoginWithScatter);
    yield takeLatest(SCATTER_ACTIONS.LOGIN, loginWithScatter);
    yield takeLatest(SCATTER_ACTIONS.GET_WALLET, fetchUserWallet);
}