const createFormAction = actionType => payload => ({
    type: actionType,
    payload
});

export default createFormAction;