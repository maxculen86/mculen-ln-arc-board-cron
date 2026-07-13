import { isEmptyString } from './dataValidation';

const removeExtraSpaces = str => {
    if (isEmptyString(str)) {
        return str;
    }

    return str.trim().replace(/ {2,}/g, ' ');
};

export default removeExtraSpaces;
