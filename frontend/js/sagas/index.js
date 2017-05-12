import {take, put, fork, call, select} from 'redux-saga/effects';
import is from 'is';
import validator from '../utils/validator';
import {api} from '../utils/api';
import {mapOid} from '../utils/utils';
import ACTION_TYPES from '../constants/actionTypes';
import {addExperimentForm} from '../selectors/experiment';
import {addVoltamogrammForm, addScanForm} from '../selectors/scan';

function* fetchExperiments() {
    while(true) {
        yield take(ACTION_TYPES.FETCH_EXPERIMENTS);
        const data = yield call(api.fetch_experiments);
        yield put({
            type: ACTION_TYPES.FETCH_EXPERIMENTS_SUCCESS,
            payload: data['data']['data'].map(mapOid)
        });
    }
}

function* createExperiment() {
    while(true) {
        yield take(ACTION_TYPES.ADD_EXPERIMENT);
        const form = yield select(addExperimentForm);
        const [invalidFields, experimentObj] = validator(form);
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

function* editExperiment() {
    while(true) {
        const action = yield take(ACTION_TYPES.EDIT_EXPERIMENT);
        const { payload: { _id, ...restObj } } = action;
        const [invalidFields, experimentObj] = validator(restObj);
        if(is.empty(invalidFields)) {
            yield call(api.edit_experiment, {_id, ...experimentObj});
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
        const voltamogramm = yield select(addVoltamogrammForm);
        const scan = yield select(addScanForm);
        const { regime, measure_mode, ...restScan } = scan;
        const data = {
            ...payload,
            voltamogramm,
            scan: {
                regime,
                ...measure_mode[regime],
                ...restScan
            }
        };
        yield call(api.add_scan, data);
    }
}

function* fetchVoltamogramms() {
    while(true) {
        const action = yield take(ACTION_TYPES.FETCH_VOLTAMOGRAMMS);
        const { payload } = action;
        const data = yield call(api.fetch_voltamogramms, payload);
        yield put({
            type: ACTION_TYPES.FETCH_VOLTAMOGRAMMS_SUCCESS,
            payload: data['data']['data'].map(mapOid)
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
    yield fork(editExperiment);
}