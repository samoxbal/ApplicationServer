import {Card} from 'semantic-ui-react';

const VACard = ({children, className, ...restProps}) => (
    <Card className={`VACard ${className}`} {...restProps}>
        <Card.Content>
            { children }
        </Card.Content>
    </Card>
);

export default VACard;