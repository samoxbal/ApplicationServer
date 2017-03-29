import {combineReducers} from 'redux';
import ACTION_TYPES from '../constants/actionTypes';
import {createSimpleReducer} from '../utils/createReducers';

const experiments = createSimpleReducer([], ACTION_TYPES.FETCH_EXPERIMENTS_SUCCESS);

const selectedExperimentId = createSimpleReducer("", ACTION_TYPES.SELECT_EXPERIMENT);

const errors = createSimpleReducer({}, ACTION_TYPES.SET_ERROR);

const openAddVoltamogramm = createSimpleReducer(false, ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM);

const voltamogramms = createSimpleReducer([], ACTION_TYPES.FETCH_VOLTAMOGRAMMS_SUCCESS);

const voltamogramm = createSimpleReducer({}, ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS);

const rootReducer = combineReducers({
    experiments,
    selectedExperimentId,
    errors,
    openAddVoltamogramm,
    voltamogramms,
    voltamogramm
});

export default rootReducer;