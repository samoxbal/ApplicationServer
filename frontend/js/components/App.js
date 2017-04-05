import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import AddExperiment from './AddExperiment';
import ExperimentsPage from './ExperimentsPage';
import VoltamogrammPage from './VoltamogrammPage';
import Login from './Login';
import {Auth} from './Auth';

const renderLogin = props => {
    if(!localStorage.getItem("token")) {
        return <Login {...props} />;
    } else {
        return <Redirect to="/all" />;
    }
};

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" render={renderLogin} />
            <Route path="/add" component={Auth(AddExperiment)} />
            <Route path="/all" component={Auth(ExperimentsPage)} />
            <Route path="/voltamogramm/:id" component={Auth(VoltamogrammPage)} />
        </div>
    </BrowserRouter>
);

export default App;