import {Component, PropTypes} from 'react';
import {Form} from 'semantic-ui-react';
import Datetime from 'react-datetime';
import classNames from 'classnames';
import is from 'is';

export default class AddExperimentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        errors: PropTypes.object,
        experiment: PropTypes.object,
        active: PropTypes.bool
    }

    static defaultProps = {
        active: true
    }

    onCancelClick = () => {
        const {onCancel} = this.props;
        if (is.fn(onCancel)) {
            onCancel();
        }
    }

    renderPickerBegin(errors, experiment, active) {
        const PickerBeginStyle = {
            className: classNames(
                "form-control has-feedback-left",
                {"parsley-error": errors.start_date}
            ),
            placeholder: "Дата начала",
            ref: ref => this._beginDate = ref,
            disabled: !active
        };
        return (
            <Form.Field
                control={Datetime}
                inputProps={PickerBeginStyle}
                closeOnSelect={true}
                timeFormat={false}
                defaultValue={experiment ? experiment.start_date : ""}
            />
        );
    }

    renderPickerEnd(errors, experiment, active) {
        const PickerEndStyle = {
            className: classNames(
                "form-control has-feedback-left",
                {"parsley-error": errors.end_date}
            ),
            placeholder: "Дата начала",
            ref: ref => this._endDate = ref,
            disabled: !active
        };
        return (
            <Form.Field
                control={Datetime}
                inputProps={PickerEndStyle}
                closeOnSelect={true}
                timeFormat={false}
                defaultValue={experiment ? experiment.end_date : ""}
            />
        );
    }

    submitExperiment = event => {
        event.preventDefault();
        this.props.onSubmit({
            name: {
                value: this._name.value,
                type: "required"
            },
            description: {
                value: this._description.value,
                type: "required"
            },
            start_date: {
                value: this._beginDate.value,
                type: "date"
            },
            end_date: {
                value: this._endDate.value,
                type: "date"
            }
        })
    }

    render() {
        const {errors, experiment, active} = this.props;

        return (
            <Form onSubmit={this.submitExperiment}>
                <Form.Group inline>
                    {this.renderPickerBegin(errors, experiment, active)}
                    {this.renderPickerEnd(errors, experiment, active)}
                </Form.Group>
                <Form.Input
                    type="text"
                    error={!!errors.name}
                    placeholder="Название эксперимента"
                    ref={ref => this._name = ref}
                    defaultValue={experiment ? experiment.name : ""}
                    disabled={!active}
                />
                <Form.TextArea
                    error={!!errors.description}
                    placeholder="Описание эксперимента"
                    rows="4"
                    ref={ref => this._description = ref}
                    defaultValue={experiment ? experiment.description : ""}
                    disabled={!active}
                />
                {active && <Form.Group inline>
                    <Form.Button primary={true}>
                        {experiment ? 'Редактировать' : 'Создать'}
                    </Form.Button>
                    <Form.Button onClick={this.onCancelClick}>
                        Отмена
                    </Form.Button>
                </Form.Group>}
            </Form>
        )
    }
}