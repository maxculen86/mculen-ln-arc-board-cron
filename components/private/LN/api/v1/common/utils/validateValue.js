export const validateValueText = value => {
    if (typeof value === 'string' || value instanceof String) return false;
    return true;
};
export const validateArrayNull = array => {
    let containNull = true;
    for (const item of array) {
        if (item != null) {
            containNull = false;
            break;
        }
    }
    return containNull;
};
