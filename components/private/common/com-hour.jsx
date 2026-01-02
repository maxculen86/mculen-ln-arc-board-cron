import React from 'react';
import PropTypes from 'fusion:prop-types';
import { cx } from '@ln/ds-cva';
import dateAndTimeUtil from './utils/dateAndTimeUtil';
import { formatTimelineTime } from '../../features/common/timezone/utils/timezoneConversion';
import '../../../resources/dist/css/ln/components/com-hour.css';

function ComHour(props) {
    const { displayDate, labelEdicionImpresa, size = '--twoxs' } = props;

    const { text: textEdicionImpresa } = labelEdicionImpresa || {};
    const adjustedTime = formatTimelineTime(displayDate);
    const { time: fallbackTime } = dateAndTimeUtil(displayDate);
    const time = adjustedTime || fallbackTime;

    if (textEdicionImpresa === 'Impresa') return null;

    return (
        <time className={cx('com-hour', size)} dateTime={time}>
            {time}
        </time>
    );
}

ComHour.propTypes = {
    displayDate: PropTypes.string.isRequired,
    labelEdicionImpresa: PropTypes.string,
    size: PropTypes.string
};

ComHour.defaultProps = {
    labelEdicionImpresa: null,
    size: ''
};

export default ComHour;
