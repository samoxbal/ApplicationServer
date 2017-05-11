import {Component, PropTypes} from 'react';
import Datetime from 'react-datetime';
import FileUpload from './FileUpload';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createScan, openAddVoltamogramm} from '../actions';
import {Modal, Form, Segment, Header} from 'semantic-ui-react';
import Regime from './Regime';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';

const mapStateToProps = state => ({
    errors: state.errors,
    openPanel: state.openAddVoltamogramm,
    experiment_id: state.selectedExperimentId,
    addVoltamogramm: state.addVoltamogrammForm,
    addScan: state.addScanForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createScan,
    openAddVoltamogramm,
    changeCyclic: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_CYCLIC),
    changeVaCycleDatetime: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_DATE),
    changeDescription: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_DESCRIPTION),
    changeSolution: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_SOLUTION),
    changeNumberOfElectrodes: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_ELECTROD_NUMBERS),
    changeEquipmentId: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_EQUIPMENT_ID)
}, dispatch);


class AddScan extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        createScan: PropTypes.func,
        experiment_id: PropTypes.string
    }

    PickerStyleVoltamogramm = {
        className: "form-control has-feedback-left",
        placeholder: "Дата начала"
    }

    PickerStyleScan = {
        className: "form-control has-feedback-left",
        placeholder: "Дата начала"
    }

    numberElectrodsOptions = [
        { key: '1', text: '1', value: 1 },
        { key: '2', text: '2', value: 2 },
        { key: '3', text: '3', value: 3 },
        { key: '4', text: '4', value: 4 }
    ]

    regimeOptions = [
        { key: '01', text: 'normal', value: 'normal' },
        { key: '02', text: 'differential', value: 'differential' },
        { key: '03', text: 'square_wave', value: 'square_wave' },
        { key: '04', text: 'staircase', value: 'staircase' },
        { key: '05', text: 'ac', value: 'ac' }
    ]

    handleSubmit(e) {
        e.preventDefault();
        let fileData = new FormData();
        const file = this._file.getFile();
        fileData.append('file', file);
        this.props.createScan({
            file: fileData
        });
    }

    render() {
        const {
            openPanel,
            openAddVoltamogramm,
            addVoltamogramm,
            addScan
        } = this.props;

        return (
            <Modal
                open={openPanel}
                onClose={() => openAddVoltamogramm(false)}
            >
                <Modal.Header>Создать вольтамограмму</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Segment>
                            <Header as="h2">Параметры вольтаммограммы</Header>
                            <Form.Group widths="equal">
                                <Form.Field
                                    control={Datetime}
                                    inputProps={this.PickerStyleVoltamogramm}
                                    closeOnSelect={true}
                                    timeFormat={false}
                                    value={addVoltamogramm.va_cycle_datetime}
                                />
                                <Form.Checkbox
                                    label="Цикличная вольтамперограмма"
                                    toggle
                                />
                            </Form.Group>
                            <Form.TextArea
                                placeholder="Описание"
                                rows="4"
                                value={addVoltamogramm.description}
                            />
                            <Form.Group widths="equal">
                                <Form.Input
                                    type="text"
                                    placeholder="Раствор"
                                    value={addVoltamogramm.solution}
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Серийный номер электрода"
                                    value={addVoltamogramm.equipment_id}
                                />
                                <Form.Select
                                    placeholder="Количество электродов"
                                    options={this.numberElectrodsOptions}
                                />
                            </Form.Group>
                        </Segment>
                        <Segment>
                            <Header as="h2">Параметры измерения</Header>
                            <Form.Group widths="equal">
                                <Form.Field
                                    control={Datetime}
                                    inputProps={this.PickerStyleScan}
                                    closeOnSelect={true}
                                    timeFormat={false}
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Начальный потенциал"
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Конечный потенциал"
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    type="text"
                                    placeholder="Номер канала"
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Имя канала"
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    type="text"
                                    placeholder="Температура"
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Давление"
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Checkbox label="Прямая развертка" toggle />
                                <Form.Input
                                    type="text"
                                    placeholder="Скорость развертки"
                                />
                            </Form.Group>
                            <Form.Checkbox label="Мешалка" toggle />
                            {visibleStirring &&
                            <Form.Input
                                type="text"
                                placeholder="Скорость перемешивания"
                            />}
                            <Form.Checkbox label="Вращение электрода" toggle />
                            {visibleRotate &&
                            <Form.Input
                                type="text"
                                placeholder="Скорость вращения"
                            />}
                            <Form.Select
                                placeholder="Тип измерения"
                                options={this.regimeOptions}
                            />
                            <Regime/>
                            <FileUpload ref={ref => this._file = ref} />
                        </Segment>
                        <Form.Button primary basic>Создать</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScan);