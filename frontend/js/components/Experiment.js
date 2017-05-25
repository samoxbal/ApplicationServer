import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {List} from 'semantic-ui-react';
import AddVoltamogramm from './AddVoltamogramm';
import {getSelectedExperiment} from '../selectors/experiment';
import {openAddVoltamogramm, editExperiment, resetAddExperimentForm} from '../actions/index';
import VAButton from './vascan-ui/VAButton';
import AddExperimentForm from './AddExperimentForm';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';

const mapStateToProps = state => ({
    experiment: getSelectedExperiment(state),
    voltamogramms: state.voltamogramms,
    errors: state.errors,
    form: state.addExperimentForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openAddVoltamogramm,
    editExperiment,
    resetAddExperimentForm,
    changeName: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_NAME),
    changeDescription: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_DESCRIPTION),
    changeStartDate: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_START),
    changeEndDate: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_END)
}, dispatch);

class Experiment extends Component {
    constructor() {
        super();
        this.state = {
            activeEdit: false
        }
    }

    openAddVoltamogramm = () => this.props.openAddVoltamogramm(true)

    activeEditExperiment = () => this.setState({ activeEdit: true })

    deactiveEditExperiment = () => {
        this.setState({ activeEdit: false });
        this.props.resetAddExperimentForm();
    }

    editExperiment = experiment_update => {
        const { experiment: { _id }, editExperiment } = this.props;
        editExperiment({
            _id,
            ...experiment_update
        })
    }

    renderExperiment() {
        const {
            experiment,
            errors,
            changeName,
            changeDescription,
            changeStartDate,
            changeEndDate,
            form,
            resetAddExperimentForm
        } = this.props;

        return (
            <div style={{ clear: 'both', paddingTop: 10 }}>
                <AddExperimentForm
                    experiment={experiment}
                    form={form}
                    errors={errors}
                    active={this.state.activeEdit}
                    onCancel={this.deactiveEditExperiment}
                    onSubmit={this.editExperiment}
                    changeName={changeName}
                    changeDescription={changeDescription}
                    changeStartDate={changeStartDate}
                    changeEndDate={changeEndDate}
                    resetForm={resetAddExperimentForm}
                />
            </div>
        )
    }

    renderVoltamogramms(voltamogramms) {
        return (
            <List divided relaxed>
                {voltamogramms.map(item => (
                    <List.Item key={item._id} className="ListItem">
                        <List.Icon name="file" />
                        <List.Content>
                            <List.Header>
                                <Link to={`/voltamogramm/${item._id}`}>{item._id}</Link>
                            </List.Header>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        )
    }

    render() {
        const {experiment, voltamogramms} = this.props;

        return (
            <div>
                {experiment && <div>
                    <VAButton
                        icon='plus'
                        onClick={this.openAddVoltamogramm}
                        content='Создать вольтамограмму'
                        labelPosition='left'
                        basic
                    />
                    <VAButton
                        icon='edit'
                        onClick={this.activeEditExperiment}
                        content='Редактировать эксперимент'
                        labelPosition='left'
                        basic
                    />
                    {this.renderExperiment()}
                    {!!voltamogramms.length && this.renderVoltamogramms(voltamogramms)}
                    <AddVoltamogramm/>
                </div>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);