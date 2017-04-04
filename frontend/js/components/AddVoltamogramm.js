import {Component, PropTypes} from 'react';
import Datetime from 'react-datetime';
import FileUpload from './FileUpload';
import Switch from 'react-toggle-switch';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createScan, openAddVoltamogramm} from '../actions';
import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';
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
        fileData.set('file', file);
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
            file: file
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
            <Panel
                isOpen={openPanel}
                onDismiss= {() => openAddVoltamogramm(false)}
                type={PanelType.extraLarge}
                headerText='Создать вольтамограмму'
            >
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>Параметры вольтаммограммы</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <Datetime
                                        inputProps={PickerStyleVoltamogramm}
                                        closeOnSelect={true}
                                        timeFormat={false}
                                    />
                                    <span className="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                                    <br/>
                                    <label className="col-md-4">Цикличная вольтамперограмма</label>
                                    <div className="col-md-8">
                                        <Switch
                                            on={cyclic}
                                            onClick={this.handleCyclic}
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <textarea className="form-control" placeholder="Описание" rows="4" ref={ref => this._description = ref} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input type="text" className="form-control" placeholder="Раствор" ref={ref => this._solution = ref} />
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="text" className="form-control" placeholder="Серийный номер электрода" ref={ref => this._serialNumber = ref} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <select className="form-control" ref={ref => this._count = ref}>
                                        <option disabled="" defaultChecked="">Количество электродов</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>Параметры измерения</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <br />
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <Datetime
                                        inputProps={PickerStyleScan}
                                        closeOnSelect={true}
                                        timeFormat={false}
                                    />
                                    <span className="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                                </div>
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Начальный потенциал" ref={ref => this._startPotential = ref} />
                                </div>
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Конечный потенциал" ref={ref => this._endPotential = ref} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Номер канала" ref={ref => this._numberChannel = ref} />
                                </div>
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Имя канала" ref={ref => this._nameChannel = ref} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Температура" ref={ref => this._temperature = ref} />
                                </div>
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Давление" ref={ref => this._pressure = ref} />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label className="col-md-4">Прямая развертка</label>
                                    <div className="col-md-8">
                                        <Switch
                                            on={directDirection}
                                            onClick={this.handleDirection}
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Скорость развертки" ref={ref => this._speedDirection = ref} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label className="col-md-4">Мешалка</label>
                                    <div className="col-md-8">
                                        <Switch
                                            on={visibleStirring}
                                            onClick={this.handleStirring}
                                        />
                                    </div>
                                </div>
                                {visibleStirring &&
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Скорость перемешивания" ref={ref => this._speedStirring = ref} />
                                </div>}
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label className="col-md-4">Вращение электрода</label>
                                    <div className="col-md-8">
                                        <Switch
                                            on={visibleRotate}
                                            onClick={this.handleRotate}
                                        />
                                    </div>
                                </div>
                                {visibleRotate &&
                                <div className="form-group col-md-4">
                                    <input type="text" className="form-control" placeholder="Скорость вращения" ref={ref => this._speedRotate = ref} />
                                </div>}
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <select className="form-control" onChange={this.handleRegime}>
                                        <option disabled="" defaultChecked="">Тип измерения</option>
                                        <option value="normal">Normal</option>
                                        <option value="differential">Differential</option>
                                        <option value="square_wave">Square wave</option>
                                        <option value="staircase">Staircase</option>
                                        <option value="ac">Ac</option>
                                    </select>
                                </div>
                            </div>
                            <Regime
                                regime={regime}
                                ref={ref => this._regime = ref}
                            />
                            <div className="row">
                                <div className="col-md-12">
                                    <FileUpload ref={ref => this._file = ref} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-success">Создать</button>
                    </div>
                </form>
            </Panel>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScan);