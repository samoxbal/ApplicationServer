import {Component} from 'react';
import {connect} from 'react-redux';
import is from 'is';
import {bindActionCreators} from 'redux';
import PageLayout from './vascan-ui/PageLayout';
import VACard from './vascan-ui/VACard';
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

    render() {
        const {voltamogramm} = this.props;

        return (
            <PageLayout>
                <div className="VoltamogrammPage">
                    <AddVoltamogrammForm/>
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