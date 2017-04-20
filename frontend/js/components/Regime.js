import {Component} from 'react';
import {Form} from 'semantic-ui-react';

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
            <Form.Group inline>
                <Form.Input
                    type="text"
                    placeholder="Normal pulse life"
                />
                <Form.Input
                    type="text"
                    placeholder="Normal pulse period"
                />
            </Form.Group>
        )
    }

    renderDifferential() {
        return (
            <Form.Group inline>
                <Form.Input
                    type="text"
                    placeholder="Differential pulse amplitude"
                />
                <Form.Input
                    type="text"
                    placeholder="Differential pulse pulsewidth"
                />
                <Form.Input
                    type="text"
                    placeholder="Differential pulse period"
                />
            </Form.Group>
        )
    }

    renderSquare() {
        return (
            <Form.Group inline>
                <Form.Input
                    type="text"
                    placeholder="Square wave amplitude"
                />
                <Form.Input
                    type="text"
                    placeholder="Square wave estep"
                />
                <Form.Input
                    type="text"
                    placeholder="Square wave time period"
                />
            </Form.Group>
        )
    }

    renderStairCase() {
        return (
            <Form.Group inline>
                <Form.Input
                    type="text"
                    placeholder="Staircase time step"
                />
                <Form.Input
                    type="text"
                    placeholder="Staircase estep"
                />
            </Form.Group>
        )
    }

    renderAc() {
        return (
            <Form.Group inline>
                <Form.Input
                    type="text"
                    placeholder="Ac amplitude"
                />
                <Form.Input
                    type="text"
                    placeholder="Ac frequency"
                />
            </Form.Group>
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
            <div>
                {this.renderRegime(this.props.regime)}
            </div>
        )
    }
}