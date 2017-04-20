import {Component} from 'react';
import {connect} from 'react-redux';
import is from 'is';
import {bindActionCreators} from 'redux';
import {Card} from 'semantic-ui-react';
import Header from './Header';
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

    }

    render() {
        const {voltamogramm} = this.props;

        return (
            <div className="main_container">
                <Header/>
                <div className="VoltamogrammPage">
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