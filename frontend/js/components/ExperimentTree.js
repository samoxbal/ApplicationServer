import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TreeFolder from './TreeFolder';
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
        return (
            <TreeFolder
                data={this.props.experiments}
                onClickItem={_id => this.onClickExperiment(_id)}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentTree);