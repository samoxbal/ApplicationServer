import {Component} from 'react';
import Header from '../Header';

export default class PageLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                { this.props.children }
            </div>
        )
    }
}