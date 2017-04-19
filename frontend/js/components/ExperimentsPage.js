import {Component} from 'react';
import Header from './Header';
import ExperimentTree from './ExperimentTree';
import Experiment from './Experiment';
import {Card} from 'semantic-ui-react';

export default class ExperimentsPage extends Component {

    render() {
        return <div className="main_container">
            <Header />
            <div className="ExperimentsPage">
                <Card className="ExperimentsPage__Tree">
                    <Card.Content>
                        <ExperimentTree/>
                    </Card.Content>
                </Card>
                <Card className="ExperimentsPage__Item">
                    <Card.Content>
                        <Experiment/>
                    </Card.Content>
                </Card>
            </div>
        </div>
    }
}