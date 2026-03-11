import React from 'react';
import dateAndTimeUtil from './utils/dateAndTimeUtil';
import '../../../resources/dist/css/ln/components/com-date.css';

function ComDate({ display_date: displayDate, size }) {
    const { date } = dateAndTimeUtil(displayDate);

    return (
        <time className={`com-date ${size || '--twoxs'}`} dateTime={`${date}`}>
            {date}
        </time>
    );
}

export default ComDate;
