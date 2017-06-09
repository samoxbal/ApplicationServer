import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import ACTION_TYPES from '../constants/actionTypes';
import {createSimpleReducer, createFormReducer} from '../utils/createReducers';

const experiments = createSimpleReducer([], ACTION_TYPES.FETCH_EXPERIMENTS_SUCCESS);
const selectedExperimentId = createSimpleReducer("", ACTION_TYPES.SELECT_EXPERIMENT);
const errors = createSimpleReducer({}, ACTION_TYPES.SET_ERROR);
const openAddVoltamogramm = createSimpleReducer(false, ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM);
const voltamogramms = createSimpleReducer([], ACTION_TYPES.FETCH_VOLTAMOGRAMMS_SUCCESS);
const voltamogramm = createSimpleReducer({}, ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS);
const measure = createSimpleReducer({}, ACTION_TYPES.FETCH_SINGLE_MEASURE_SUCCESS);
const measures = createSimpleReducer([], ACTION_TYPES.FETCH_MEASURES_SUCCESS);
const selectedScanId = createSimpleReducer("", ACTION_TYPES.SELECT_SCAN);
const activeEditVoltamogramm = createSimpleReducer(false, ACTION_TYPES.ACTIVE_EDIT_VOLTAMOGRAMM);

const addExperimentForm = combineReducers({
    name: createFormReducer("", ACTION_TYPES.CHANGE_EXPERIMENT_NAME, ACTION_TYPES.RESET_ADD_EXPERIMENT),
    description: createFormReducer("", ACTION_TYPES.CHANGE_EXPERIMENT_DESCRIPTION, ACTION_TYPES.RESET_ADD_EXPERIMENT),
    start_date: createFormReducer("", ACTION_TYPES.CHANGE_EXPERIMENT_START, ACTION_TYPES.RESET_ADD_EXPERIMENT),
    end_date: createFormReducer("", ACTION_TYPES.CHANGE_EXPERIMENT_END, ACTION_TYPES.RESET_ADD_EXPERIMENT)
});

const addVoltamogrammForm = combineReducers({
    cyclic: createFormReducer(false, ACTION_TYPES.CHANGE_VOLTAMOGRAMM_CYCLIC, ACTION_TYPES.RESET_ADD_VOLTAMOGRAMM),
    va_cycle_datetime: createFormReducer("", ACTION_TYPES.CHANGE_VOLTAMOGRAMM_DATE, ACTION_TYPES.RESET_ADD_VOLTAMOGRAMM),
    description: createFormReducer("", ACTION_TYPES.CHANGE_VOLTAMOGRAMM_DESCRIPTION, ACTION_TYPES.RESET_ADD_VOLTAMOGRAMM),
    solution: createFormReducer("", ACTION_TYPES.CHANGE_VOLTAMOGRAMM_SOLUTION, ACTION_TYPES.RESET_ADD_VOLTAMOGRAMM),
    number_of_electrodes: createFormReducer(1, ACTION_TYPES.CHANGE_VOLTAMOGRAMM_ELECTROD_NUMBERS, ACTION_TYPES.RESET_ADD_VOLTAMOGRAMM),
    equipment_id: createFormReducer("", ACTION_TYPES.CHANGE_VOLTAMOGRAMM_EQUIPMENT_ID, ACTION_TYPES.RESET_ADD_VOLTAMOGRAMM),
});

const addScanForm = combineReducers({
    scan_datetime: createFormReducer("", ACTION_TYPES.CHANGE_SCAN_DATETIME, ACTION_TYPES.RESET_ADD_SCAN),
    start_potential: createFormReducer("", ACTION_TYPES.CHANGE_START_POTENTIAL, ACTION_TYPES.RESET_ADD_SCAN),
    end_potential: createFormReducer("", ACTION_TYPES.CHANGE_END_POTENTIAL, ACTION_TYPES.RESET_ADD_SCAN),
    reverse_direction: createFormReducer(false, ACTION_TYPES.CHANGE_REVERSE_DIRECTION, ACTION_TYPES.RESET_ADD_SCAN),
    stirring: createFormReducer(false, ACTION_TYPES.CHANGE_STIRRING, ACTION_TYPES.RESET_ADD_SCAN),
    stirring_speed: createFormReducer("", ACTION_TYPES.CHANGE_STIRRING_SPEED, ACTION_TYPES.RESET_ADD_SCAN),
    rotation: createFormReducer(false, ACTION_TYPES.CHANGE_ROTATION, ACTION_TYPES.RESET_ADD_SCAN),
    rotation_speed: createFormReducer("", ACTION_TYPES.CHANGE_ROTATION_SPEED, ACTION_TYPES.RESET_ADD_SCAN),
    channel_id: createFormReducer("", ACTION_TYPES.CHANGE_CHANNEL_ID, ACTION_TYPES.RESET_ADD_SCAN),
    channel_label: createFormReducer("", ACTION_TYPES.CHANGE_CHANNEL_LABEL, ACTION_TYPES.RESET_ADD_SCAN),
    temperature: createFormReducer("", ACTION_TYPES.CHANGE_TEMPERATURE, ACTION_TYPES.RESET_ADD_SCAN),
    pressure: createFormReducer("", ACTION_TYPES.CHANGE_PRESSURE, ACTION_TYPES.RESET_ADD_SCAN),
    regime: createFormReducer("", ACTION_TYPES.CHANGE_REGIME, ACTION_TYPES.RESET_ADD_SCAN),
    measure_mode: combineReducers({
        normal: combineReducers({
            normal_pulse_life: createSimpleReducer("", ACTION_TYPES.CHANGE_NORMAL_PULSE_LIFE),
            normal_pulse_period: createSimpleReducer("", ACTION_TYPES.CHANGE_NORMAL_PULSE_PERIOD)
        }),
        differential: combineReducers({
            differential_pulse_amplitude: createSimpleReducer("", ACTION_TYPES.CHANGE_DIFFERENTIAL_PULSE_AMPLITUDE),
            differential_pulse_pulsewidth: createSimpleReducer("", ACTION_TYPES.CHANGE_DIFFERENTIAL_PULSE_PULSEWIDTH),
            differential_pulse_period: createSimpleReducer("", ACTION_TYPES.CHANGE_DIFFERENTIAL_PULSE_PERIOD)
        }),
        square_wave: combineReducers({
            square_wave_amplitude: createSimpleReducer("", ACTION_TYPES.CHANGE_SQUARE_WAVE_AMPLITUDE),
            square_wave_estep: createSimpleReducer("", ACTION_TYPES.CHANGE_SQUARE_WAVE_ESTEP),
            square_wave_time_period: createSimpleReducer("", ACTION_TYPES.CHANGE_SQUARE_WAVE_TIME_PERIOD)
        }),
        staircase: combineReducers({
            staircase_time_step: createSimpleReducer("", ACTION_TYPES.CHANGE_STAIRCASE_TIME_STEP),
            staircase_estep: createSimpleReducer("", ACTION_TYPES.CHANGE_STAIRCASE_ESTEP)
        }),
        ac: combineReducers({
            ac_amplitude: createSimpleReducer("", ACTION_TYPES.CHANGE_AC_AMPLITUDE),
            ac_frequency: createSimpleReducer("", ACTION_TYPES.CHANGE_AC_FREQUENCY)
        })
    })
});

const rootReducer = combineReducers({
    router: routerReducer,
    experiments,
    selectedExperimentId,
    errors,
    openAddVoltamogramm,
    voltamogramms,
    voltamogramm,
    addExperimentForm,
    addVoltamogrammForm,
    addScanForm,
    measure,
    measures,
    selectedScanId,
    activeEditVoltamogramm
});

export default rootReducer;