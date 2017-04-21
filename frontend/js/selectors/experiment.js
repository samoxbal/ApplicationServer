import { createSelector } from 'reselect';

const experiments = state => state.experiments;
const selectedExperimentId = state => state.selectedExperimentId;
const addExperimentForm = state => state.addExperimentForm;

const getSelectedExperiment = createSelector([experiments, selectedExperimentId], (experiments, id) => {
    return id ? experiments.find(experiment => experiment._id == id) : null;
});

export {
    getSelectedExperiment,
    addExperimentForm
}