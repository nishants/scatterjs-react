import {all} from 'redux-saga/effects';
// import runnerSagas from './Runner/saga';

export default function* rootSaga(){
    yield all([
        // runnerSagas()
    ]);
}