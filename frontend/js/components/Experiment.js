import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import AddVoltamogramm from './AddVoltamogramm';
import {getSelectedExperiment} from '../selectors/experiment';
import {openAddVoltamogramm, editExperiment} from '../actions/index';
import {Button} from 'semantic-ui-react';
import AddExperimentForm from './AddExperimentForm';

const mapStateToProps = state => ({
    experiment: getSelectedExperiment(state),
    voltamogramms: state.voltamogramms,
    errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openAddVoltamogramm,
    editExperiment
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

    deactiveEditExperiment = () => this.setState({ activeEdit: false })

    editExperiment = experiment_update => {
        const { experiment: { _id }, editExperiment } = this.props;
        editExperiment({
            _id,
            ...experiment_update
        })
    }

    renderExperiment() {
        const {experiment, errors} = this.props;

        return (
            <div>
                <AddExperimentForm
                    experiment={experiment}
                    errors={errors}
                    active={this.state.activeEdit}
                    onCancel={this.deactiveEditExperiment}
                    onSubmit={this.editExperiment}
                />
            </div>
        )
    }

    renderVoltamogramms(voltamogramms) {
        return voltamogramms.map(item => (
            <div key={item._id} className="Experiment__Voltamogramm">
                <i className="fa fa-file-text-o Experiment__Voltamogramm__Icon"></i>
                <Link to={`/voltamogramm/${item._id}`}>{item._id}</Link>
            </div>
        ))
    }

    render() {
        const {experiment, voltamogramms} = this.props;

        return (
            <div>
                {experiment && <div>
                    <Button
                        icon='plus'
                        onClick={this.openAddVoltamogramm}
                        content='Создать вольтамограмму'
                        labelPosition='left'
                        basic={true}
                    />
                    <Button
                        icon='edit'
                        onClick={this.activeEditExperiment}
                        content='Редактировать эксперимент'
                        labelPosition='left'
                        basic={true}
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