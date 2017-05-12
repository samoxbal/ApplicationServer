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
    changeEquipmentId: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_EQUIPMENT_ID),
    changeScanDatetime: createFormAction(ACTION_TYPES.CHANGE_SCAN_DATETIME),
    changeStartPotential: createFormAction(ACTION_TYPES.CHANGE_START_POTENTIAL),
    changeEndPotential: createFormAction(ACTION_TYPES.CHANGE_END_POTENTIAL),
    changeReverseDirection: createFormAction(ACTION_TYPES.CHANGE_REVERSE_DIRECTION),
    changeStirring: createFormAction(ACTION_TYPES.CHANGE_STIRRING),
    changeStirringSpeed: createFormAction(ACTION_TYPES.CHANGE_STIRRING_SPEED),
    changeRotation: createFormAction(ACTION_TYPES.CHANGE_ROTATION),
    changeRotationSpeed: createFormAction(ACTION_TYPES.CHANGE_ROTATION_SPEED),
    changeChannelId: createFormAction(ACTION_TYPES.CHANGE_CHANNEL_ID),
    changeChannelLabel: createFormAction(ACTION_TYPES.CHANGE_CHANNEL_LABEL),
    changeTemperature: createFormAction(ACTION_TYPES.CHANGE_TEMPERATURE),
    changePressure: createFormAction(ACTION_TYPES.CHANGE_PRESSURE),
    changeRegime: createFormAction(ACTION_TYPES.CHANGE_REGIME)
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
                                    value={addScan.scan_datetime}
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Начальный потенциал"
                                    value={addScan.start_potential}
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Конечный потенциал"
                                    value={addScan.end_potential}
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    type="text"
                                    placeholder="Номер канала"
                                    value={addScan.channel_id}
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Имя канала"
                                    value={addScan.channel_label}
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    type="text"
                                    placeholder="Температура"
                                    value={addScan.temperature}
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Давление"
                                    value={addScan.pressure}
                                />
                            </Form.Group>
                            <Form.Checkbox
                                label="Прямая развертка"
                                toggle
                            />
                            <Form.Checkbox label="Мешалка" toggle />
                            {addScan.stirring &&
                            <Form.Input
                                type="text"
                                placeholder="Скорость перемешивания"
                            />}
                            <Form.Checkbox label="Вращение электрода" toggle />
                            {addScan.rotation &&
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