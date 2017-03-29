import {Component} from 'react';
import Header from './Header';
import ExperimentTree from './ExperimentTree';
import Experiment from './Experiment';


export default class ExperimentsPage extends Component {

    render() {
        return <div className="main_container">
            <Header />
            <div className="ExperimentsPage">
                <div className="x_panel ExperimentsPage__Tree">
                    <div className="x_content">
                        <ExperimentTree/>
                    </div>
                </div>
                <div className="x_panel ExperimentsPage__Item">
                    <div className="x_content">
                        <Experiment/>
                    </div>
                </div>
            </div>
        </div>
    }
}