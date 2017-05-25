import {Component} from 'react';
import {connect} from 'react-redux';
import is from 'is';
import {bindActionCreators} from 'redux';
import {Card} from 'semantic-ui-react';
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
            <div>
                <div className="VoltamogrammPage">
                    <AddVoltamogrammForm/>
                    <Card className="VoltamogrammPage__Tree">
                        <Card.Content>
                            {!is.empty(voltamogramm) && this.renderTree(voltamogramm)}
                        </Card.Content>
                    </Card>
                    <Card className="x_panel VoltamogrammPage__Scan">

                    </Card>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoltamogrammPage);