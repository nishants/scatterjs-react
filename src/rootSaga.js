import {all} from 'redux-saga/effects';
import scatterSaga from './components/scatter/scatter_saga';

export default function* rootSaga(){
    yield all([
        scatterSaga()
    ]);
}