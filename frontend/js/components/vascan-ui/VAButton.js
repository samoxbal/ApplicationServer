import { Button } from 'semantic-ui-react';

const VAButton = ({children, basic, ...rest}) => (
    <Button className={`VAButton${basic ? '_basic' : '_simple'}`} {...rest}>
        { children }
    </Button>
);

export default VAButton;