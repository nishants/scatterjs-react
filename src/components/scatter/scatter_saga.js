import {takeLatest, put, call} from 'redux-saga/effects';

import {
    SCATTER_ACTIONS,
    connectedScatter,
    connectionError} from './scatter_actions';

import {connect} from "./scatter_helper";

const APP_NAME = 'React-Scatter';

function* connectWithScatter(){
    try{
        yield call(connect,APP_NAME);
        yield put(connectedScatter());
    }catch(e){
        yield put(connectionError());
    }
}

export default function*  missionsSagas(){
    yield takeLatest(SCATTER_ACTIONS.CONNECT, connectWithScatter);
}