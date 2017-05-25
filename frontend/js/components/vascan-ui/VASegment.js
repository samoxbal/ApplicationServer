import {Segment} from 'semantic-ui-react';

const VASegment = ({children, className, ...rest}) => (
    <Segment className={`VASegment ${className}`} {...rest}>
        {children}
    </Segment>
);

export default VASegment;
