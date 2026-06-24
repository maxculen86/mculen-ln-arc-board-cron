export const isValidNumber = number => typeof number === 'number';

export const isValidNonZeroNumber = number =>
    isValidNumber(number) && number !== 0;

export const isValidString = string => typeof string === 'string';

export const isNonEmptyArray = value =>
    Array.isArray(value) && value.length > 0;

export const isEmptyString = string => {
    if (isValidString(string)) {
        return !string.trim();
    }
    return true;
};

export const escapedStringForRegex = string => {
    if (isEmptyString(string)) {
        return '';
    }
    return string.replace(/[/.^$|?*+(){}[\]]/g, '\\$&');
};
