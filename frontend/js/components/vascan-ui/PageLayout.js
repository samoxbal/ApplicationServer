import { Component, PropTypes } from 'react';
import VAButton from '../vascan-ui/VAButton';
import { Menu, Icon } from 'semantic-ui-react';

export default class PageLayout extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            visible: false
        }
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
        return (
            <div>
                <VAButton
                    icon
                    basic
                    onClick={this.toggleVisibility}
                    style={{ margin: '20px 0 -10px 30px' }}
                >
                    <Icon name='sidebar' />
                </VAButton>
                { this.state.visible &&
                <Menu className="Header">
                    <Menu.Item
                        name="Добавить эксперимент"
                        onClick={() => this.context.router.history.push("/add")}
                    />
                    <Menu.Item
                        name="Все эксперименты"
                        onClick={() => this.context.router.history.push("/all")}
                    />
                </Menu> }
                { this.props.children }
            </div>
        )
    }
}