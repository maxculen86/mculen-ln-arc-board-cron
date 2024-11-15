import { isEmptyString } from './dataValidation';

const createDateObject = (date, time = '') => {
    const dateTime = isEmptyString(time)
        ? new Date(date)
        : new Date(`${date} ${time}`);

    if (Number.isNaN(dateTime.getTime())) {
        return '';
    }

    return dateTime;
};
export default createDateObject;
