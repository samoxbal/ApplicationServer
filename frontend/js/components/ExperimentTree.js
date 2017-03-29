import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
        const { experiments, selectedExperimentId } = this.props;

        return (
            <ul className="ExperimentTree__list">
                {experiments.map((item, index) =>
                    <li
                        key={index}
                        className="ExperimentTree__listItem_li"
                        onClick={() => this.onClickExperiment(item._id)}
                    >
                        <div className="ExperimentTree__listItem_div">
                            <div className="ExperimentTree__listItem_item">
                                <div className={`ExperimentTree__listItem_name${selectedExperimentId == item._id ? '_bold' : ''}`}>
                                    <i className="fa fa-folder-o ExperimentTree__listItem_icon" />
                                    {item.name}
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentTree);