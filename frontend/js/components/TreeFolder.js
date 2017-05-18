import {Component} from 'react';
import {List} from 'semantic-ui-react';

export default class TreeFolder extends Component {
    render() {
        const {data, onClickItem} = this.props;
        return (
            <List>
                {data.map((item, index) =>
                    <List.Item
                        as="a"
                        key={index}
                        onClick={() => onClickItem(item._id)}
                    >
                        <List.Icon name="folder" />
                        <List.Content>
                            <List.Header>
                                {item.name || item._id}
                            </List.Header>
                        </List.Content>
                    </List.Item>
                )}
            </List>
        )
    }
}