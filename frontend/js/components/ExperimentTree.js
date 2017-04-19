import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List} from 'semantic-ui-react';
import {FetchExperiments, selectExperiment, fetchVoltamogramms} from '../actions';

const mapStateToProps = state => ({
    experiments: state.experiments,
    selectedExperimentId: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    FetchExperiments,
    selectExperiment,
    fetchVoltamogramms
}, dispatch);

class ExperimentTree extends Component {
    componentDidMount() {
        this.props.FetchExperiments();
    }

    onClickExperiment = _id => {
        this.props.selectExperiment(_id);
        this.props.fetchVoltamogramms(_id);
    }

    render() {
        const { experiments } = this.props;

        return (
            <List>
                {experiments.map((item, index) =>
                    <List.Item
                        key={index}
                        onClick={() => this.onClickExperiment(item._id)}
                    >
                        <List.Icon name="folder" />
                        <List.Content>
                            <List.Header>
                                {item.name}
                            </List.Header>
                        </List.Content>
                    </List.Item>
                )}
            </List>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentTree);