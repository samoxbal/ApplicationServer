import {Component, PropTypes} from 'react';
import Datetime from 'react-datetime';
import FileUpload from './FileUpload';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createScan, openAddVoltamogramm} from '../actions';
import {Modal, Form, Segment, Header} from 'semantic-ui-react';
import Regime from './Regime';

const mapStateToProps = state => ({
    errors: state.errors,
    openPanel: state.openAddVoltamogramm,
    experiment_id: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createScan,
    openAddVoltamogramm
}, dispatch);


class AddScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleStirring: false,
            visibleRotate: false,
            directDirection: false,
            cyclic: false,
            PickerStyleVoltamogramm: {
                className: "form-control has-feedback-left",
                placeholder: "Дата начала",
                ref: (ref) => this._DateVoltamogramm = ref
            },
            PickerStyleScan: {
                className: "form-control has-feedback-left",
                placeholder: "Дата начала",
                ref: (ref) => this._DateScan = ref
            },
            regime: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        createScan: PropTypes.func,
        experiment_id: PropTypes.string
    }

    handleSubmit(e) {
        e.preventDefault();
        let fileData = new FormData();
        const file = this._file.getFile();
        fileData.append('file', file);
        this.props.createScan({
            experiment_id: this.props.experiment_id,
            scan: {
                scan_datetime: this._DateScan.value,
                start_potential: this._startPotential.value,
                end_potential: this._endPotential.value,
                reverse_direction: this.state.directDirection,
                //scan_rate: DataTypes.REAL,
                stirring: this.state.visibleStirring,
                stirring_speed: this._speedStirring ? this._speedStirring.value: null,
                rotation: this.state.visibleRotate,
                rotation_speed: this._speedRotate ? this._speedRotate.value : null,
                channel_id: this._numberChannel.value,
                channel_label: this._nameChannel.value,
                temperature: this._temperature.value,
                pressure: this._pressure.value,
                regime: this.state.regime,
                measure_mode: {
                    ...this._regime.getRegime()
                }
            },
            voltamogramm: {
                cyclic: this.state.cyclic,
                va_cycle_datetime: this._DateVoltamogramm.value,
                description: this._description.value,
                solution: this._solution.value,
                number_of_electrodes: this._count.value,
                equipment_id: this._serialNumber.value,
            },
            file: fileData
        });
    }

    handleStirring = () => this.setState({
        visibleStirring: !this.state.visibleStirring
    })

    handleRotate = () => this.setState({
        visibleRotate: !this.state.visibleRotate
    })

    handleDirection = () => this.setState({
        directDirection: !this.state.directDirection
    })

    handleCyclic = () => this.setState({
        cyclic: !this.state.cyclic
    })

    handleRegime = event => this.setState({
        regime: event.target.value
    })

    render() {
        const {
            visibleStirring,
            visibleRotate,
            directDirection,
            cyclic,
            PickerStyleVoltamogramm,
            PickerStyleScan,
            regime
        } = this.state;

        const { openPanel, openAddVoltamogramm } = this.props;

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
                                    inputProps={PickerStyleVoltamogramm}
                                    closeOnSelect={true}
                                    timeFormat={false}
                                />
                                <Form.Checkbox label="Цикличная вольтамперограмма" toggle />
                            </Form.Group>
                            <Form.TextArea
                                placeholder="Описание"
                                rows="4"
                            />
                            <Form.Group widths="equal">
                                <Form.Input
                                    type="text"
                                    placeholder="Раствор"
                                />
                                <Form.Input
                                    type="text"
                                    placeholder="Серийный номер электрода"
                                />
                                <Form.Select
                                    placeholder="Количество электродов"
                                />
                            </Form.Group>
                        </Segment>
                        <Segment>
                            <Header as="h2">Параметры измерения</Header>
                            <Form.Group widths="equal">
                                <Form.Field
                                    control={Datetime}
                                    inputProps={PickerStyleScan}
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
                            />
                            <Regime
                                regime={regime}
                                ref={ref => this._regime = ref}
                            />
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