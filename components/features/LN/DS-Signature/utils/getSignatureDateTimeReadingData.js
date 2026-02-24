import get from '../../../../private/common/utils/get';
import dateAndTimeUtil from '../../../../private/common/utils/dateAndTimeUtil';
import getReadingTimeData from '../../../../private/common/utils/getReadingTimeData';

const getSignatureDateTimeReadingData = ({
    globalContent = {},
    showDateTimeAndReadingTime = false
} = {}) => {
    const displayDate = get(globalContent, 'display_date', '');
    const { date = '', time = '' } = displayDate
        ? dateAndTimeUtil(displayDate)
        : {};
    const readingTime = getReadingTimeData(globalContent);
    const shouldRenderDateTimeAndReadingTime =
        showDateTimeAndReadingTime && (date || time || readingTime);

    return {
        date,
        time,
        readingTime,
        shouldRenderDateTimeAndReadingTime
    };
};

export default getSignatureDateTimeReadingData;
