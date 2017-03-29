import ACTION_TYPES from '../constants/actionTypes';

export function FetchExperiments() {
    return {
        type: ACTION_TYPES.FETCH_EXPERIMENTS
    }
}

export function selectExperiment(_id) {
    return {
        type: ACTION_TYPES.SELECT_EXPERIMENT,
        payload: _id
    }
}

export function createExperiment(experiment) {
    return {
        type: ACTION_TYPES.ADD_EXPERIMENT,
        experiment: experiment
    }
}

export function createScan(data) {
    return {
        type: ACTION_TYPES.ADD_SCAN,
        payload: data
    }
}

export function openAddVoltamogramm(state) {
    return {
        type: ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM,
        payload: state
    }
}

export function fetchVoltamogramms(id) {
    return {
        type: ACTION_TYPES.FETCH_VOLTAMOGRAMMS,
        payload: id
    }
}

export function fetchSingleVoltamogramm(id) {
    return {
        type: ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM,
        payload: id
    }
}