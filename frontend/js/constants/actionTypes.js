import keyMirror from 'key-mirror';

const ACTION_TYPES = keyMirror({
    ADD_EXPERIMENT: null,
    FETCH_EXPERIMENTS: null,
    FETCH_EXPERIMENTS_SUCCESS: null,
    ADD_EXPERIMENT_SUCCESS: null,
    SELECT_EXPERIMENT: null,
    SET_ERROR: null,
    ADD_SCAN: null,
    OPEN_ADD_VOLTAMOGRAMM: null,
    FETCH_VOLTAMOGRAMMS: null,
    FETCH_VOLTAMOGRAMMS_SUCCESS: null,
    FETCH_SINGLE_VOLTAMOGRAMM: null,
    FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS: null
});

export default ACTION_TYPES;