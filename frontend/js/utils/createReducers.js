import matcher from '../utils/matcher';

const createSimpleReducer = (initialState, actionType) => (state = initialState, action) => {
    const {type, payload} = action;
    if (matcher(type, actionType)) {
        return payload;
    }
    return state;
};

export {
    createSimpleReducer
}