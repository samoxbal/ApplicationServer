import {Component} from 'react';
import {connect} from 'react-redux';
import is from 'is';
import {bindActionCreators} from 'redux';
import PageLayout from './vascan-ui/PageLayout';
import VACard from './vascan-ui/VACard';
import VAButton from './vascan-ui/VAButton';
import TreeFolder from './TreeFolder';
import AddVoltamogrammForm from './AddVoltamogrammForm';
import {fetchSingleVoltamogramm} from '../actions';

const mapStateToProps = state => ({
    voltamogramm: state.voltamogramm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSingleVoltamogramm
}, dispatch);

class VoltamogrammPage extends Component {
    componentWillMount() {
        const {match: { params: { id } }, fetchSingleVoltamogramm} = this.props;
        fetchSingleVoltamogramm(id);
    }

    renderTree(voltamogramm) {
        const { scans } = voltamogramm;
        return (
            <TreeFolder
                data={scans}
            />
        )
    }

    renderVoltamogrammForm() {
        return (
            <div className="VoltamogrammPage__voltamogrammForm">
                <VAButton
                    icon='plus'
                    // onClick={this.openAddVoltamogramm}
                    content='Создать скан'
                    labelPosition='left'
                    basic
                />
                <VAButton
                    icon='edit'
                    // onClick={this.activeEditExperiment}
                    content='Редактировать вольтамограмму'
                    labelPosition='left'
                    basic
                />
                <AddVoltamogrammForm/>
            </div>
        )
    }

    render() {
        const {voltamogramm} = this.props;

        return (
            <PageLayout>
                <div className="VoltamogrammPage">
                    {this.renderVoltamogrammForm()}
                    <VACard className="VoltamogrammPage__Tree">
                        {!is.empty(voltamogramm) && this.renderTree(voltamogramm)}
                    </VACard>
                    <VACard className="x_panel VoltamogrammPage__Scan">

                    </VACard>
                </div>
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoltamogrammPage);