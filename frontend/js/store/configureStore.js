import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import root from '../sagas';
import createSagaMiddleware from 'redux-saga';

const initialState = {
    experiments: [],
    selectedExperimentId: "",
    errors: {},
    openAddVoltamogramm: false,
    voltamogramms: [],
    voltamogramm: {}
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(root);

export default store;
