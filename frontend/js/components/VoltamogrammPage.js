import {Component} from 'react';
import {connect} from 'react-redux';
import is from 'is';
import {bindActionCreators} from 'redux';
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
        const {routeParams: {id}, fetchSingleVoltamogramm} = this.props;
        fetchSingleVoltamogramm(id);
    }

    renderTree(voltamogramm) {
        const {scans} = voltamogramm;


    }

    render() {
        const {voltamogramm} = this.props;

        return (
            <div className="main_container">
                <Header/>
                <div className="VoltamogrammPage">
                    <div className="x_panel VoltamogrammPage__Tree">
                        <div className="x_content">
                            {!is.empty(voltamogramm) && this.renderTree(voltamogramm)}
                        </div>
                    </div>
                    <div className="x_panel VoltamogrammPage__Scan">
                        <div className="x_content">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoltamogrammPage);