import {Component, PropTypes} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createExperiment} from '../actions';
import AddExperimentForm from './AddExperimentForm';
import {Card} from 'semantic-ui-react';

const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createExperiment
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

    submitExperiment(data) {
        this.props.createExperiment(data);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="AddExperment">
                    <Card style={{ width: '90%' }}>
                        <Card.Content>
                            <AddExperimentForm
                                isEdit={false}
                                onSubmit={this.submitExperiment}
                                errors={this.props.errors}
                            />
                        </Card.Content>
                    </Card>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExperiment);