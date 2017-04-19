import { Component, PropTypes } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        this.context.router.history.push("/");
    }

    render() {
        return (
            <Menu inverted={true}>
                <Menu.Item
                    name="Добавить эксперимент"
                    onClick={() => this.context.router.history.push("/add")}
                />
                <Menu.Item
                    name="Все эксперименты"
                    onClick={() => this.context.router.history.push("/all")}
                />
                <Menu.Menu position="right">
                    <Dropdown item={true} text={localStorage.getItem("email")}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.logout()}>
                                Выйти из системы
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        )
    }
}
