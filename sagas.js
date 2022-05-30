import { all, put, takeEvery, call } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* helloSaga() {
    console.log("Hello sagas!")
}
//Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield call(delay, 1000)
    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC',  incrementAsync)
}

//Notice how we now only export the rootSaga
//single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
}