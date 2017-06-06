import {Component} from 'react';
import {connect} from 'react-redux';
import is from 'is';
import {bindActionCreators} from 'redux';
import PageLayout from './vascan-ui/PageLayout';
import VACard from './vascan-ui/VACard';
import VAButton from './vascan-ui/VAButton';
import TreeFolder from './TreeFolder';
import Scan from './Scan';
import AddVoltamogrammForm from './AddVoltamogrammForm';
import {
    fetchSingleVoltamogramm,
    fetchMeasures,
    selectScan,
    activeEditVoltamogramm
} from '../actions';

const mapStateToProps = state => ({
    voltamogramm: state.voltamogramm,
    measures: state.measures
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSingleVoltamogramm,
    fetchMeasures,
    selectScan,
    activeEditVoltamogramm
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
                onClickItem={_id => {
                    this.props.selectScan(_id);
                    this.props.fetchMeasures(_id);
                }}
            />
        )
    }

    renderVoltamogrammForm() {
        const {activeEditVoltamogramm} = this.props;
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
                    onClick={() => activeEditVoltamogramm(true)}
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
                        <Scan/>
                    </VACard>
                </div>
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoltamogrammPage);