import { monthNames } from '../../../../../components/private/common/utils/dateAndTimeUtil';

const getMonthNumber = (monthString = '') => {
    return monthNames.indexOf(monthString) !== -1
        ? monthNames.indexOf(monthString) + 1
        : '';
};

export default getMonthNumber;
