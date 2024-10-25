export const validateValueText = value =>
    !(typeof value === 'string' || value instanceof String);

export const validateArrayNull = array => !array.some(item => item != null);
