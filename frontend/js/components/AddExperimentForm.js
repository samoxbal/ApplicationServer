import {Component, PropTypes} from 'react';
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
            <Datetime
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
            <Datetime
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

        const nameClass = classNames(
            "form-control",
            {"parsley-error": errors.name}
        );

        const descriptionClass = classNames(
            "form-control",
            {"parsley-error": errors.description}
        );

        return (
            <form className="form-horizontal" onSubmit={this.submitExperiment}>
                <div className="x_content">
                    <br />
                    <div className="row">
                        <div className="form-group col-md-3">
                            {this.renderPickerBegin(errors, experiment, active)}
                            <span className="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                        </div>
                        <div className="form-group col-md-3">
                            {this.renderPickerEnd(errors, experiment, active)}
                            <span className="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-8">
                            <input
                                type="text"
                                className={nameClass}
                                placeholder="Название эксперимента"
                                ref={ref => this._name = ref}
                                defaultValue={experiment ? experiment.name : ""}
                                disabled={!active}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-8">
                            <textarea
                                className={descriptionClass}
                                placeholder="Описание эксперимента"
                                rows="4"
                                ref={ref => this._description = ref}
                                defaultValue={experiment ? experiment.description : ""}
                                disabled={!active}
                            />
                        </div>
                    </div>
                    {active && <div className="text-left">
                        <button type="submit" className="btn btn-success">
                            {experiment ? 'Редактировать' : 'Создать'}
                        </button>
                        <button type="btn" className="btn btn-primary" onClick={this.onCancelClick}>
                            Отмена
                        </button>
                    </div>}
                </div>
            </form>
        )
    }
}