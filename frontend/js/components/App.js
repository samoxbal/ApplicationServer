import {BrowserRouter, Route} from 'react-router-dom';
import AddExperiment from './AddExperiment';
import ExperimentsPage from './ExperimentsPage';
import VoltamogrammPage from './VoltamogrammPage';
import Login from './Login';
import {Auth} from './Auth';

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/add" component={Auth(AddExperiment)} />
            <Route path="/all" component={Auth(ExperimentsPage)} />
            <Route path="/voltamogramm/:id" component={Auth(VoltamogrammPage)} />
        </div>
    </BrowserRouter>
);

export default App;