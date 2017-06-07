import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {List} from 'semantic-ui-react';
import {getSelectedScan} from '../selectors/scan';
import AddScanForm from './AddScanForm';

const mapStateToProps = state => ({
    measures: state.measures,
    scan: getSelectedScan(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

class Scan extends Component {

    renderMeasures(measures) {
        return (
            <List divided relaxed>
                {measures.map(item => (
                    <List.Item key={item._id} className="ListItem">
                        <List.Icon name="file" />
                        <List.Content>
                            <List.Header>
                                <Link to={`/measure/${item._id}`}>{item._id}</Link>
                            </List.Header>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        )
    }

    render() {
        const {scan, measures} = this.props;

        return (
            <div>
                {scan && <div>
                    <AddScanForm/>
                    {measures.length && this.renderMeasures(measures)}
                </div>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scan);