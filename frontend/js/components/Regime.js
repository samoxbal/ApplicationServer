import {Component} from 'react';

export default class Regime extends Component {
    getRegime() {
        switch (this.props.regime) {
            case "normal":
                return {
                    normal_pulse_life: this._normal_pulse_life.value,
                    normal_pulse_period: this._normal_pulse_period.value
                };
            case "differential":
                return {
                    differential_pulse_amplitude: this._differential_pulse_amplitude.value,
                    differential_pulse_pulsewidth: this._differential_pulse_pulsewidth.value,
                    differential_pulse_period: this._differential_pulse_period.value
                };
            case "square_wave":
                return {
                    square_wave_amplitude: this._square_wave_amplitude.value,
                    square_wave_estep: this._square_wave_estep.value,
                    square_wave_time_period: this._square_wave_time_period.value
                };
            case "staircase":
                return {
                    staircase_time_step: this._staircase_time_step.value,
                    staircase_estep: this._staircase_estep.value
                };
            case "ac":
                return {
                    ac_amplitude: this._ac_amplitude.value,
                    ac_frequency: this._ac_frequency.value
                };
            default:
                return null;
        }
    }

    renderNormal() {
        return (
            <div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Normal pulse life" ref={ref => this._normal_pulse_life = ref} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Normal pulse period" ref={ref => this._normal_pulse_period = ref} />
                </div>
            </div>
        )
    }

    renderDifferential() {
        return (
            <div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Differential pulse amplitude" ref={ref => this._differential_pulse_amplitude = ref} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Differential pulse pulsewidth" ref={ref => this._differential_pulse_pulsewidth = ref} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Differential pulse period" ref={ref => this._differential_pulse_period = ref} />
                </div>
            </div>
        )
    }

    renderSquare() {
        return (
            <div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Square wave amplitude" ref={ref => this._square_wave_amplitude = ref} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Square wave estep" ref={ref => this._square_wave_estep = ref} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Square wave time period" ref={ref => this._square_wave_time_period = ref} />
                </div>
            </div>
        )
    }

    renderStairCase() {
        return (
            <div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Staircase time step" ref={ref => this._staircase_time_step = ref} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Staircase estep" ref={ref => this._staircase_estep = ref} />
                </div>
            </div>
        )
    }

    renderAc() {
        return (
            <div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Ac amplitude" ref={ref => this._ac_amplitude = ref} />
                </div>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Ac frequency" ref={ref => this._ac_frequency = ref} />
                </div>
            </div>
        )
    }

    renderRegime(regime) {
        switch (regime) {
            case "normal":
                return this.renderNormal();
            case "differential":
                return this.renderDifferential();
            case "square_wave":
                return this.renderSquare();
            case "staircase":
                return this.renderStairCase();
            case "ac":
                return this.renderAc();
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="row">
                {this.renderRegime(this.props.regime)}
            </div>
        )
    }
}