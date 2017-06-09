import {take, put, fork, call, select} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import is from 'is';
import validator from '../utils/validator';
import {api} from '../utils/api';
import {mapOid} from '../utils/utils';
import ACTION_TYPES from '../constants/actionTypes';
import {
    experimentRequiredFields,
    voltamogrammRequiredFields,
    scanRequiredFields
} from '../constants/requiredFields';
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
        const [invalidFields, experimentObj] = validator(form, experimentRequiredFields);
        if(is.empty(invalidFields)) {
            yield call(api.add_experiment, experimentObj);
            yield put(push('/all'));
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
        const [invalidFields, experimentObj] = validator(restObj, experimentRequiredFields);
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
        const [invalidVoltamogrammFields] = validator(voltamogramm, voltamogrammRequiredFields);
        const [invalidScanFields] = validator(scan, scanRequiredFields);
        if(is.empty(invalidVoltamogrammFields) && is.empty(invalidScanFields)) {
            const { regime, measure_mode, ...restScan } = scan;
            const data = {
                ...payload,
                voltamogramm,
                scan: {
                    regime,
                    measure_mode: measure_mode[regime],
                    ...restScan
                }
            };
            yield call(api.add_scan, data);
        } else {
            yield put({
                type: ACTION_TYPES.SET_ERROR,
                payload: {
                    ...invalidVoltamogrammFields,
                    ...invalidScanFields
                }
            })
        }
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
        const voltamogramm = mapOid(data['data']['data']);
        const {scans} = voltamogramm;
        yield put({
            type: ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS,
            payload: {
                ...voltamogramm,
                scans: scans.map(mapOid)
            }
        });
    }
}

function* fetchSingleMeasure() {
    while(true) {
        const action = yield take(ACTION_TYPES.FETCH_SINGLE_MEASURE);
        const { payload } = action;
        const data = yield call(api.fetch_single_measure, payload);
        yield put({
            type: ACTION_TYPES.FETCH_SINGLE_MEASURE_SUCCESS,
            payload: data['data']['data']
        });
    }
}

function* fetchMeasures() {
    while(true) {
        const action = yield take(ACTION_TYPES.FETCH_MEASURES);
        const { payload } = action;
        const data = yield call(api.fetch_measures, payload);
        yield put({
            type: ACTION_TYPES.FETCH_MEASURES_SUCCESS,
            payload: data['data']['data'].map(mapOid)
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
    yield fork(fetchSingleMeasure);
    yield fork(fetchMeasures);
}