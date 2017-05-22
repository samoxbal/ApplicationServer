import {Form} from 'semantic-ui-react';

export const VAInput = props => (
    <Form.Input className="VAInput" {...props} />
);

export const VATextArea = props => (
    <Form.TextArea className="VATextArea" {...props} />
);

export const VAButton = ({children, basic, ...rest}) => (
    <Form.Button className={`VAButton${basic ? '_basic' : ''}`} {...rest}>
        { children }
    </Form.Button>
);