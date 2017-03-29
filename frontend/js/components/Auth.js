import {Component} from 'react';
import {Redirect} from 'react-router-dom';

export const Auth = (AuthComponent) => class extends Component {

    checkAuth() {
        return localStorage.getItem("token");
    }

    render() {
        return <div>
            {this.checkAuth() ? <AuthComponent {...this.props} /> : <Redirect to="/" />}
        </div>
    }
};