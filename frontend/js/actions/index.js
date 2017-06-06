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

export function createExperiment() {
    return {
        type: ACTION_TYPES.ADD_EXPERIMENT
    }
}

export function editExperiment(experiment) {
    return {
        type: ACTION_TYPES.EDIT_EXPERIMENT,
        payload: experiment
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
        payload: {
            experiment: id
        }
    }
}

export function fetchSingleVoltamogramm(id) {
    return {
        type: ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM,
        payload: {
            voltamogramm: id
        }
    }
}

export function resetAddExperimentForm() {
    return {
        type: ACTION_TYPES.RESET_ADD_EXPERIMENT
    }
}

export function fetchSingleMeasure(id) {
    return {
        type: ACTION_TYPES.FETCH_SINGLE_MEASURE,
        payload: {
            measure: id
        }
    }
}

export function fetchMeasures(id) {
    return {
        type: ACTION_TYPES.FETCH_MEASURES,
        payload: {
            scan: id
        }
    }
}

export function selectScan(_id) {
    return {
        type: ACTION_TYPES.SELECT_SCAN,
        payload: _id
    }
}

export function activeEditVoltamogramm(state) {
    return {
        type: ACTION_TYPES.ACTIVE_EDIT_VOLTAMOGRAMM,
        payload: state
    }
}