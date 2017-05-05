import {Component, PropTypes} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createExperiment} from '../actions';
import AddExperimentForm from './AddExperimentForm';
import {Card} from 'semantic-ui-react';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addExperimentForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createExperiment,
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
            form
        } = this.props;

        return (
            <div>
                <Header />
                <div className="AddExperment">
                    <Card style={{ width: '70%' }}>
                        <Card.Content>
                            <AddExperimentForm
                                isEdit={false}
                                onSubmit={this.submitExperiment}
                                errors={this.props.errors}
                                changeName={changeName}
                                changeDescription={changeDescription}
                                changeStartDate={changeStartDate}
                                changeEndDate={changeEndDate}
                                form={form}
                            />
                        </Card.Content>
                    </Card>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExperiment);