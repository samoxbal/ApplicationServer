import {Component, PropTypes} from 'react';
import {CommandBar} from 'office-ui-fabric-react/lib/CommandBar';
import {IconName} from 'office-ui-fabric-react/lib/Icon';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.items = [
            {
                key: 'logo',
                name: 'VASCAN',
                style: {
                    color: '#fff'
                },
            },
            {
                key: 'all',
                style: {
                    color: '#fff'
                },
                onClick: () => this.context.router.push("/all"),
                iconProps: {
                    iconName: IconName.Financial,
                    style: {
                        color: '#fff'
                    }
                },
                name: 'Все эксперименты'
            },
            {
                key: 'add',
                style: {
                    color: '#fff'
                },
                onClick: () => this.context.router.push("/add"),
                iconProps: {
                    iconName: IconName.CalculatorAddition,
                    style: {
                        color: '#fff'
                    }
                },
                name: 'Добавить эксперимент'
            }
        ];
        this.farItems = [
            {
                key: 'menu',
                style: {
                    color: '#fff'
                },
                subMenuProps: {
                    items: [
                        {
                            key: 'logout',
                            name: 'Выйти из системы',
                            onClick: this.logout
                        }
                    ]
                },
                name: localStorage.getItem('email')
            }
        ]
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    logout() {
        localStorage.removeItem("token");
        this.context.router.push("/");
    }

    render() {
        return <div>
            <CommandBar
                isSearchBoxVisible={false}
                items={this.items}
                farItems={this.farItems}
                className="Header"
            />
        </div>
    }
}
