import matcher from '../utils/matcher';

const createSimpleReducer = (initialState, actionType) => (state = initialState, action) => {
    const {type, payload} = action;
    if (matcher(type, actionType)) {
        return payload;
    }
    return state;
};

const createFormReducer = (initialState, actionSet, actionReset) => (state = initialState, action) => {
    const {type, payload} = action;
    if (matcher(type, actionSet)) {
        return payload;
    }
    if (matcher(type, actionReset)) {
        return initialState;
    }
    return state;
};

export {
    createSimpleReducer,
    createFormReducer
}