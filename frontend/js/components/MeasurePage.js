import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card} from 'semantic-ui-react';
import Header from './Header';
import {fetchSingleMeasure} from '../actions';

const mapStateToProps = state => ({
    measure: state.measure
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSingleMeasure
}, dispatch);

class MeasurePage extends Component {
    componentWillMount() {
        const {match: { params: { id } }, fetchSingleMeasure} = this.props;
        fetchSingleMeasure(id);
    }

    render() {
        const {measure} = this.props;

        return (
            <div className="main_container">
                <Header/>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePage);