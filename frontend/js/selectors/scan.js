import { createSelector } from 'reselect';

const addVoltamogrammForm = state => state.addVoltamogrammForm;
const addScanForm = state => state.addScanForm;
const voltamogramm = state => state.voltamogramm;
const getSelectedScanId = state => state.selectedScanId;

const getSelectedScan = createSelector(
    [voltamogramm, getSelectedScanId],
    (voltamogramm, scanId) => {
        return scanId ? voltamogramm.scans.find(scan => scan._id == scanId) : null;
    }
);

const isSelectedScan = createSelector(
    getSelectedScan,
    scan => !!scan
);

export {
    addVoltamogrammForm,
    addScanForm,
    getSelectedScan,
    isSelectedScan
}
