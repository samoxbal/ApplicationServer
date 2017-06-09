import {Component} from 'react';
import Datetime from 'react-datetime';
import FileUpload from './FileUpload';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import Regime from './Regime';
import {Form, Header} from 'semantic-ui-react';
import VASegment from './vascan-ui/VASegment';
import {VAInput, VASelect, VACheckbox} from './vascan-ui/VAForm';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';
import {getSelectedScan, isSelectedScan} from '../selectors/scan';

const mapStateToProps = state => ({
    errors: state.errors,
    addScan: state.addScanForm,
    scan: getSelectedScan(state),
    isScanExist: isSelectedScan(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
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


class AddScanForm extends Component {

    PickerStyleScan = {
        className: "form-control has-feedback-left",
        placeholder: "Дата начала"
    }

    regimeOptions = [
        { key: '01', text: 'normal', value: 'normal' },
        { key: '02', text: 'differential', value: 'differential' },
        { key: '03', text: 'square_wave', value: 'square_wave' },
        { key: '04', text: 'staircase', value: 'staircase' },
        { key: '05', text: 'ac', value: 'ac' }
    ]

    getFile() {
        return this._file.getFile();
    }

    render() {
        const {
            addScan,
            errors,
            scan,
            isScanExist
        } = this.props;

        return (
            <Form>
                <VASegment>
                    <Header as="h2">Параметры измерения</Header>
                    <Form.Group widths="equal">
                        <VAInput
                            control={Datetime}
                            inputProps={this.PickerStyleScan}
                            closeOnSelect={true}
                            timeFormat={false}
                            error={!!errors.scan_datetime}
                            value={addScan.scan_datetime}
                            onChange={date => this.props.changeScanDatetime(moment(date).format("YYYY-MM-DD"))}
                        />
                        <VAInput
                            type="text"
                            placeholder="Начальный потенциал"
                            value={addScan.start_potential}
                            error={!!errors.start_potential}
                            onChange={(e, data) => this.props.changeStartPotential(data.value)}
                        />
                        <VAInput
                            type="text"
                            placeholder="Конечный потенциал"
                            value={addScan.end_potential}
                            error={!!errors.end_potential}
                            onChange={(e, data) => this.props.changeEndPotential(data.value)}
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <VAInput
                            type="text"
                            placeholder="Номер канала"
                            value={addScan.channel_id}
                            onChange={(e, data) => this.props.changeChannelId(data.value)}
                        />
                        <VAInput
                            type="text"
                            placeholder="Имя канала"
                            value={addScan.channel_label}
                            onChange={(e, data) => this.props.changeChannelLabel(data.value)}
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <VAInput
                            type="text"
                            placeholder="Температура"
                            value={addScan.temperature}
                            error={!!errors.temperature}
                            onChange={(e, data) => this.props.changeTemperature(data.value)}
                        />
                        <VAInput
                            type="text"
                            placeholder="Давление"
                            value={addScan.pressure}
                            error={!!errors.pressure}
                            onChange={(e, data) => this.props.changePressure(data.value)}
                        />
                    </Form.Group>
                    <VACheckbox
                        label="Прямая развертка"
                        toggle
                        checked={addScan.reverse_direction}
                        onChange={(e, data) => this.props.changeReverseDirection(!addScan.reverse_direction)}
                    />
                    <VACheckbox
                        label="Мешалка"
                        toggle
                        checked={addScan.stirring}
                        onChange={(e, data) => this.props.changeStirring(!addScan.stirring)}
                    />
                    {addScan.stirring &&
                    <VAInput
                        type="text"
                        placeholder="Скорость перемешивания"
                        value={addScan.stirring_speed}
                        onChange={(e, data) => this.props.changeStirringSpeed(data.value)}
                    />}
                    <VACheckbox
                        label="Вращение электрода"
                        toggle
                        checked={addScan.rotation}
                        onChange={(e, data) => this.props.changeRotation(!addScan.rotation)}
                    />
                    {addScan.rotation &&
                    <VAInput
                        type="text"
                        placeholder="Скорость вращения"
                        value={addScan.rotation_speed}
                        onChange={(e, data) => this.props.changeRotationSpeed(data.value)}
                    />}
                    <VASelect
                        placeholder="Тип измерения"
                        options={this.regimeOptions}
                        value={addScan.regime}
                        error={!!errors.regime}
                        onChange={(e, data) => this.props.changeRegime(data.value)}
                    />
                    <Regime/>
                    {!isScanExist && <FileUpload ref={ref => this._file = ref} />}
                </VASegment>
            </Form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(AddScanForm);