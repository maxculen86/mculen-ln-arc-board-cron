import React from 'react';
import { cx } from '@ln/ds-cva';
import dateAndTimeUtil from './utils/dateAndTimeUtil';

import '../../../resources/dist/css/ln/components/com-date.css';

function ComDate({ displayDate, size = '--twoxs' }) {
    const { date, isoDate } = dateAndTimeUtil(displayDate);

    return (
        <time className={cx('com-date', size)} dateTime={isoDate}>
            {date}
        </time>
    );
}

export default ComDate;
