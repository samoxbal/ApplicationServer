import {Component, PropTypes} from 'react';
import PageLayout from './vascan-ui/PageLayout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createExperiment, resetAddExperimentForm} from '../actions';
import AddExperimentForm from './AddExperimentForm';
import VACard from './vascan-ui/VACard';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addExperimentForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createExperiment,
    resetAddExperimentForm,
    changeName: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_NAME),
    changeDescription: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_DESCRIPTION),
    changeStartDate: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_START),
    changeEndDate: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_END)
}, dispatch);


class AddExperiment extends Component {
    constructor(props) {
        super(props);
        this.submitExperiment = this.submitExperiment.bind(this);
    }

    static propTypes = {
        createExperiment: PropTypes.func
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    submitExperiment() {
        this.props.createExperiment();
    }

    render() {
        const {
            changeName,
            changeDescription,
            changeStartDate,
            changeEndDate,
            form,
            errors,
            resetAddExperimentForm
        } = this.props;

        return (
            <PageLayout>
                <div className="AddExperment">
                    <VACard style={{ width: '70%' }}>
                        <AddExperimentForm
                            isEdit={false}
                            onSubmit={this.submitExperiment}
                            errors={errors}
                            changeName={changeName}
                            changeDescription={changeDescription}
                            changeStartDate={changeStartDate}
                            changeEndDate={changeEndDate}
                            form={form}
                            resetForm={resetAddExperimentForm}
                        />
                    </VACard>
                </div>
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExperiment);