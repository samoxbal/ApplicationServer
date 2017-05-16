export default function validator(validateObj, fieldsToValidate = []) {
    let invalidFields = {};
    Object.keys(validateObj).forEach(field => {
        if (fieldsToValidate.includes(field) && !validateObj[field]) {
            invalidFields[field] = true;
        }
    });
    return [invalidFields, validateObj];
}