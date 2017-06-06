import {Component} from 'react';
import Datetime from 'react-datetime';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {Form, Header} from 'semantic-ui-react';
import VAButton from './vascan-ui/VAButton';
import {VAInput, VATextArea, VASelect, VACheckbox} from './vascan-ui/VAForm';
import VASegment from './vascan-ui/VASegment';
import createFormAction from '../utils/createFormAction';
import {activeEditVoltamogramm} from '../actions';
import ACTION_TYPES from '../constants/actionTypes';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addVoltamogrammForm,
    voltamogramm: state.voltamogramm,
    active: state.activeEditVoltamogramm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    activeEditVoltamogramm,
    changeCyclic: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_CYCLIC),
    changeVaCycleDatetime: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_DATE),
    changeDescription: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_DESCRIPTION),
    changeSolution: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_SOLUTION),
    changeNumberOfElectrodes: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_ELECTROD_NUMBERS),
    changeEquipmentId: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_EQUIPMENT_ID)
}, dispatch);

class AddVoltamogrammForm extends Component {

    PickerStyleVoltamogramm = {
        className: "form-control has-feedback-left",
        placeholder: "Дата начала"
    }

    numberElectrodsOptions = [
        { key: '1', text: '1', value: 1 },
        { key: '2', text: '2', value: 2 },
        { key: '3', text: '3', value: 3 },
        { key: '4', text: '4', value: 4 }
    ]

    render() {
        const {
            form,
            voltamogramm,
            errors,
            active,
            activeEditVoltamogramm
        } = this.props;

        return (
            <VASegment className="AddVoltamogrammForm">
                <Header as="h2">Параметры вольтаммограммы</Header>
                <Form>
                    <Form.Group widths="equal">
                        <VAInput
                            control={Datetime}
                            inputProps={this.PickerStyleVoltamogramm}
                            closeOnSelect={true}
                            timeFormat={false}
                            disabled={!active}
                            error={!!errors.va_cycle_datetime}
                            value={voltamogramm && !form.va_cycle_datetime ? voltamogramm.va_cycle_datetime : form.va_cycle_datetime}
                            onChange={date => this.props.changeVaCycleDatetime(moment(date).format("YYYY-MM-DD"))}
                        />
                        <VACheckbox
                            label="Цикличная вольтамперограмма"
                            toggle
                            disabled={!active}
                            checked={voltamogramm && !form.cyclic ? voltamogramm.cyclic : form.cyclic}
                            onChange={(e, data) => this.props.changeCyclic(!form.cyclic)}
                        />
                    </Form.Group>
                    <VATextArea
                        placeholder="Описание"
                        rows="4"
                        disabled={!active}
                        value={voltamogramm && !voltamogramm.description ? voltamogramm.description : form.description}
                        onChange={(e, data) => this.props.changeDescription(data.value)}
                    />
                    <Form.Group widths="equal">
                        <VAInput
                            type="text"
                            placeholder="Раствор"
                            disabled={!active}
                            value={voltamogramm && !form.solution ? voltamogramm.solution : form.solution}
                            onChange={(e, data) => this.props.changeSolution(data.value)}
                        />
                        <VAInput
                            type="text"
                            placeholder="Серийный номер электрода"
                            disabled={!active}
                            value={voltamogramm && !form.equipment_id ? voltamogramm.equipment_id : form.equipment_id}
                            onChange={(e, data) => this.props.changeEquipmentId(data.value)}
                        />
                        <VASelect
                            placeholder="Количество электродов"
                            options={this.numberElectrodsOptions}
                            error={!!errors.number_of_electrodes}
                            disabled={!active}
                            value={voltamogramm && !form.number_of_electrodes ? voltamogramm.number_of_electrodes : form.number_of_electrodes}
                            onChange={(e, data) => this.props.changeNumberOfElectrodes(data.value)}
                        />
                    </Form.Group>
                    {active && <Form.Group inline>
                        <VAButton basic>
                            Редактировать
                        </VAButton>
                        <VAButton
                            type="button"
                            onClick={() => activeEditVoltamogramm(false)}
                        >
                            Отмена
                        </VAButton>
                    </Form.Group>}
                </Form>
            </VASegment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVoltamogrammForm);