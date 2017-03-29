import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import AddVoltamogramm from './AddVoltamogramm';
import {getSelectedExperiment} from '../selectors/experiment';
import {openAddVoltamogramm} from '../actions';
import {Button, ButtonType} from 'office-ui-fabric-react/lib/Button';
import AddExperimentForm from './AddExperimentForm';

const mapStateToProps = state => ({
    experiment: getSelectedExperiment(state),
    voltamogramms: state.voltamogramms,
    errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openAddVoltamogramm
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

    renderExperiment() {
        const {experiment, errors} = this.props;

        return (
            <div>
                <AddExperimentForm
                    experiment={experiment}
                    errors={errors}
                    active={this.state.activeEdit}
                    onCancel={this.deactiveEditExperiment}
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
                        buttonType={ButtonType.command}
                        icon='Add'
                        onClick={this.openAddVoltamogramm}
                    >
                        Создать вольтамограмму
                    </Button>
                    <Button
                        buttonType={ButtonType.command}
                        icon='Edit'
                        onClick={this.activeEditExperiment}
                    >
                        Редактировать эксперимент
                    </Button>
                    {this.renderExperiment()}
                    {!!voltamogramms.length && this.renderVoltamogramms(voltamogramms)}
                    <AddVoltamogramm/>
                </div>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);