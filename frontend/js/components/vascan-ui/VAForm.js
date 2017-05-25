import {Form} from 'semantic-ui-react';

export const VAInput = props => (
    <Form.Input className="VAInput" {...props} />
);

export const VATextArea = props => (
    <Form.TextArea className="VATextArea" {...props} />
);

export const VAButton = ({children, basic, ...rest}) => (
    <Form.Button className={`VAFormButton${basic ? '_basic' : ''}`} {...rest}>
        { children }
    </Form.Button>
);

export const VASelect = props => (
    <Form.Select className="VASelect" {...props} />
);

export const VACheckbox = props => (
    <Form.Checkbox className="VACheckbox" {...props} />
);