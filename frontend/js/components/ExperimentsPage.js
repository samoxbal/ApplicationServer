import {Component} from 'react';
import PageLayout from './vascan-ui/PageLayout';
import ExperimentTree from './ExperimentTree';
import Experiment from './Experiment';
import VACard from './vascan-ui/VACard';

export default class ExperimentsPage extends Component {
    render() {
        return (
            <PageLayout>
                <div className="ExperimentsPage">
                    <VACard className="ExperimentsPage__Tree">
                        <ExperimentTree/>
                    </VACard>
                    <VACard className="ExperimentsPage__Item">
                        <Experiment/>
                    </VACard>
                </div>
            </PageLayout>
        )
    }
}