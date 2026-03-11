import React from 'react';
import dateAndTimeUtil from './utils/dateAndTimeUtil';
import { formatTimelineTime } from '../../features/common/timezone/utils/timezoneConversion';
import '../../../resources/dist/css/ln/components/com-hour.css';

function ComHour({
    display_date: displayDate,
    labelEdicionImpresa = null,
    size = ''
}) {
    const { text: textEdicionImpresa } = labelEdicionImpresa || {};
    const adjustedTime = formatTimelineTime(displayDate);
    const { time: fallbackTime } = dateAndTimeUtil(displayDate);
    const time = adjustedTime || fallbackTime;
    return textEdicionImpresa !== 'Impresa' ? (
        <time className={`com-hour ${size || '--twoxs'}`}>{time}</time>
    ) : null;
}

export default ComHour;
