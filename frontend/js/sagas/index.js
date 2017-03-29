import {take, put, fork, call} from 'redux-saga/effects';
import is from 'is';
import validator from '../utils/validator';
import {api} from '../utils/api';
import ACTION_TYPES from '../constants/actionTypes';

function* fetchExperiments() {
    while(true) {
        yield take(ACTION_TYPES.FETCH_EXPERIMENTS);
        const data = yield call(api.fetch_experiments);
        yield put({
            type: ACTION_TYPES.FETCH_EXPERIMENTS_SUCCESS,
            payload: data['data']
        });
    }
}

function* createExperiment() {
    while(true) {
        const action = yield take(ACTION_TYPES.ADD_EXPERIMENT);
        const { experiment } = action;
        const [invalidFields, experimentObj] = validator(experiment);
        if(is.empty(invalidFields)) {
            yield call(api.add_experiment, experimentObj);
        } else {
            yield put({
                type: ACTION_TYPES.SET_ERROR,
                payload: invalidFields
            })
        }
    }
}

function* createScan() {
    while(true) {
        const action = yield take(ACTION_TYPES.ADD_SCAN);
        const { payload } = action;
        yield call(api.add_scan, payload);
    }
}

function* fetchVoltamogramms() {
    while(true) {
        const action = yield take(ACTION_TYPES.FETCH_VOLTAMOGRAMMS);
        const { payload } = action;
        const data = yield call(api.fetch_voltamogramms, payload);
        yield put({
            type: ACTION_TYPES.FETCH_VOLTAMOGRAMMS_SUCCESS,
            payload: data['data']
        });
    }
}

function* fetchSingleVoltamogramm() {
    while(true) {
        const action = yield take(ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM);
        const { payload } = action;
        const data = yield call(api.fetch_single_voltamogramm, payload);
        yield put({
            type: ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS,
            payload: data['data']
        });
    }
}

export default function* root() {
    yield fork(fetchExperiments);
    yield fork(createExperiment);
    yield fork(createScan);
    yield fork(fetchVoltamogramms);
    yield fork(fetchSingleVoltamogramm);
}