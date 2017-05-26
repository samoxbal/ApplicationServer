import { Component, PropTypes } from 'react';
import VAButton from '../vascan-ui/VAButton';
import { Icon } from 'semantic-ui-react';
import BurgerMenu from 'react-burger-menu';

export default class PageLayout extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            visible: false
        }
        this.menuItems = [
            <a key="0" href="/add">
                <Icon name='plus' />
                <span>Добавить эксперимент</span>
            </a>,
            <a key="1" href="/all">
                <Icon name='grid layout' />
                <span>Все эксперименты</span>
            </a>,
            <a key="2" href="" onClick={this.logout}>
                <Icon name='sign out' />
                <span>Выход</span>
            </a>
        ];
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        this.context.router.history.push("/");
    }

    toggleVisibility = () => this.setState({
        visible: !this.state.visible
    })

    render() {
        const Menu = BurgerMenu['elastic'];
        return (
            <div id="outer-container">
                <Menu
                    pageWrapId="page-wrap"
                    outerContainerId="outer-container"
                    isOpen={this.state.visible}
                >
                    {this.menuItems}
                </Menu>
                <main id="page-wrap">
                    <VAButton
                        icon
                        basic
                        onClick={this.toggleVisibility}
                        style={{ margin: '20px 0 -10px 30px' }}
                    >
                        <Icon name='sidebar' />
                    </VAButton>
                    { this.props.children }
                </main>
            </div>
        )
    }
}