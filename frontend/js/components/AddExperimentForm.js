import {Component, PropTypes} from 'react';
import {Form} from 'semantic-ui-react';
import Datetime from 'react-datetime';
import classNames from 'classnames';
import is from 'is';
import moment from 'moment';

export default class AddExperimentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        errors: PropTypes.object,
        experiment: PropTypes.object,
        active: PropTypes.bool,
        form: PropTypes.object,
        resetForm: PropTypes.func
    }

    static defaultProps = {
        active: true
    }

    componentWillUnmount() {
        this.props.resetForm();
    }

    onCancelClick = () => {
        const {onCancel} = this.props;
        if (is.fn(onCancel)) {
            onCancel();
        }
    }

    onChangeName = (e, data) => this.props.changeName(data.value)
    onChangeDescription = (e, data) => this.props.changeDescription(data.value)
    onChangeStartDate = date => this.props.changeStartDate(moment(date).format("YYYY-MM-DD"))
    onChangeEndDate = date => this.props.changeEndDate(moment(date).format("YYYY-MM-DD"))

    renderPickerBegin(errors, experiment, active, form) {
        const PickerBeginStyle = {
            className: classNames(
                "form-control has-feedback-left",
                {"parsley-error": errors.start_date}
            ),
            placeholder: "Дата начала",
            disabled: !active
        };
        return (
            <Form.Field
                control={Datetime}
                inputProps={PickerBeginStyle}
                closeOnSelect={true}
                timeFormat={false}
                onChange={this.onChangeStartDate}
                value={experiment && !form.start_date ? experiment.start_date : form.start_date}
            />
        );
    }

    renderPickerEnd(errors, experiment, active, form) {
        const PickerEndStyle = {
            className: classNames(
                "form-control has-feedback-left",
                {"parsley-error": errors.end_date}
            ),
            placeholder: "Дата начала",
            disabled: !active
        };
        return (
            <Form.Field
                control={Datetime}
                inputProps={PickerEndStyle}
                closeOnSelect={true}
                timeFormat={false}
                onChange={this.onChangeEndDate}
                value={experiment && !form.end_date ? experiment.end_date : form.end_date}
            />
        );
    }

    submitExperiment = event => {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        const {errors, experiment, active, form} = this.props;

        return (
            <Form onSubmit={this.submitExperiment}>
                <Form.Group inline>
                    {this.renderPickerBegin(errors, experiment, active, form)}
                    {this.renderPickerEnd(errors, experiment, active, form)}
                </Form.Group>
                <Form.Input
                    type="text"
                    error={!!errors.name}
                    placeholder="Название эксперимента"
                    value={experiment && !form.name ? experiment.name : form.name}
                    disabled={!active}
                    onChange={this.onChangeName}
                />
                <Form.TextArea
                    error={!!errors.description}
                    placeholder="Описание эксперимента"
                    rows="4"
                    value={experiment && !form.description ? experiment.description : form.description}
                    disabled={!active}
                    onChange={this.onChangeDescription}
                />
                {active && <Form.Group inline>
                    <Form.Button primary basic>
                        {experiment ? 'Редактировать' : 'Создать'}
                    </Form.Button>
                    <Form.Button type="button" basic onClick={this.onCancelClick}>
                        Отмена
                    </Form.Button>
                </Form.Group>}
            </Form>
        )
    }
}