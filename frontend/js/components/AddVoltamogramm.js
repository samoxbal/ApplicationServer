import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createScan, openAddVoltamogramm} from '../actions';
import {Modal} from 'semantic-ui-react';
import VAButton from './vascan-ui/VAButton';
import AddVoltamogrammForm from './AddVoltamogrammForm';
import AddScanForm from './AddScanForm';

const mapStateToProps = state => ({
    errors: state.errors,
    openPanel: state.openAddVoltamogramm,
    experiment_id: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createScan,
    openAddVoltamogramm
}, dispatch);


class AddScan extends Component {

    static propTypes = {
        createScan: PropTypes.func,
        experiment_id: PropTypes.string
    }

    handleSubmit = e => {
        e.preventDefault();
        let fileData = new FormData();
        const file = this._scanForm.getFile();
        fileData.append('file', file);
        this.props.createScan({
            experiment_id: this.props.experiment_id,
            file: fileData
        });
    }

    render() {
        const {
            openPanel,
            openAddVoltamogramm
        } = this.props;

        return (
            <Modal
                open={openPanel}
                onClose={() => openAddVoltamogramm(false)}
                className="VAModal"
            >
                <Modal.Header>Создать вольтамограмму</Modal.Header>
                <Modal.Content>
                    <AddVoltamogrammForm/>
                    <AddScanForm ref={ref => this._scanForm = ref} />
                    <br/>
                    <VAButton
                        primary
                        basic
                        onClick={this.handleSubmit}
                    >
                        Создать
                    </VAButton>
                </Modal.Content>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScan);