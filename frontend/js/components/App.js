import {Route, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import AddExperiment from './AddExperiment';
import ExperimentsPage from './ExperimentsPage';
import VoltamogrammPage from './VoltamogrammPage';
import MeasurePage from './MeasurePage';
import Login from './Login';
import {Auth} from './Auth';
import {history} from '../store/configureStore';

const renderLogin = props => {
    if(!localStorage.getItem("token")) {
        return <Login {...props} />;
    } else {
        return <Redirect to="/all" />;
    }
};

const App = () => (
    <ConnectedRouter history={history}>
        <div>
            <Route exact path="/" render={renderLogin} />
            <Route path="/add" component={Auth(AddExperiment)} />
            <Route path="/all" component={Auth(ExperimentsPage)} />
            <Route path="/voltamogramm/:id" component={Auth(VoltamogrammPage)} />
            <Route path="/measure/:id" component={Auth(MeasurePage)} />
        </div>
    </ConnectedRouter>
);

export default App;