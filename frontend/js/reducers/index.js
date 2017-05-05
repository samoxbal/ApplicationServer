import {combineReducers} from 'redux';
import ACTION_TYPES from '../constants/actionTypes';
import {createSimpleReducer, createFormReducer} from '../utils/createReducers';

const experiments = createSimpleReducer([], ACTION_TYPES.FETCH_EXPERIMENTS_SUCCESS);

const selectedExperimentId = createSimpleReducer("", ACTION_TYPES.SELECT_EXPERIMENT);

const errors = createSimpleReducer({}, ACTION_TYPES.SET_ERROR);

const openAddVoltamogramm = createSimpleReducer(false, ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM);

const voltamogramms = createSimpleReducer([], ACTION_TYPES.FETCH_VOLTAMOGRAMMS_SUCCESS);

const voltamogramm = createSimpleReducer({}, ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS);

const addExperimentForm = combineReducers({
    name: createFormReducer("", ACTION_TYPES.CHANGE_EXPERIMENT_NAME, ACTION_TYPES.RESET_ADD_EXPERIMENT),
    description: createFormReducer("", ACTION_TYPES.CHANGE_EXPERIMENT_DESCRIPTION, ACTION_TYPES.RESET_ADD_EXPERIMENT),
    start_date: createFormReducer("", ACTION_TYPES.CHANGE_EXPERIMENT_START, ACTION_TYPES.RESET_ADD_EXPERIMENT),
    end_date: createFormReducer("", ACTION_TYPES.CHANGE_EXPERIMENT_END, ACTION_TYPES.RESET_ADD_EXPERIMENT)
});

const rootReducer = combineReducers({
    experiments,
    selectedExperimentId,
    errors,
    openAddVoltamogramm,
    voltamogramms,
    voltamogramm,
    addExperimentForm
});

export default rootReducer;