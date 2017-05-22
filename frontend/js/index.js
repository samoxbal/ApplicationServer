import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/configureStore';
import App from './components/App';
import '../assets/css/react-datetime.css';
import '../assets/css/main.css';
import '../assets/css/sierra.css';

window.React = React;

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
