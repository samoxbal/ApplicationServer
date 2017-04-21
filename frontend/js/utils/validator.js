export default function validator(validateObj) {
    let invalidFields = {};
    Object.keys(validateObj).forEach(field => {
        if (!validateObj[field]) {
            invalidFields[field] = true;
        }
    });
    return [invalidFields, validateObj];
}