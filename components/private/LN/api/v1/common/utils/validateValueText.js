const validateValueText = value => {
    if (typeof value === 'string' || value instanceof String) return true;
    return false;
};
export default validateValueText;
