export const isValidNumber = number => typeof number === 'number';

export const isValidString = string => typeof string === 'string';

export const isEmptyString = string => {
    if (typeof string === 'string') {
        return !string.trim();
    }
    return true;
};
