import { all } from "redux-saga/effects";

// import agentsSaga from './modules/agents/sagas/agents-saga';

export default function* rootSagas(){
    //Concat this variable with takeLatest/takeEvery array
    //imported from each saga modules
    var process = [
        // ...agentsSaga,
    ];

    yield all(process);
}