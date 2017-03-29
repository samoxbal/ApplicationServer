import moment from 'moment';

const validateTypes = {
    date: date => moment(date).isValid(),
    required: field => field.length > 0
};

export default function validator(validateObj) {
    let invalidFields = {};
    Object.keys(validateObj).forEach(field => {
        const type = validateObj[field]["type"];
        const value = validateObj[field]["value"];
        if (type) {
            const isValid = validateTypes[type](value);
            if (!isValid) {
                invalidFields[field] = true;
            }
        }
        validateObj[field] = value;
    });
    return [invalidFields, validateObj];
}