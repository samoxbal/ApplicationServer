import {Card} from 'semantic-ui-react';

const VACard = ({children, ...restProps}) => (
    <Card className="SCard" {...restProps}>
        <Card.Content>
            { children }
        </Card.Content>
    </Card>
);

export default VACard;