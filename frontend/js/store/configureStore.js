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

const composeEnhancers = !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    compose :
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(root);

export default store;
