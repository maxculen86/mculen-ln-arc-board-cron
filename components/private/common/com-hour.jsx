import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from './utils/dateAndTimeUtil';
import { formatTimelineTime } from '../../features/common/timezone/utils/timezoneConversion';
import '../../../resources/dist/css/ln/components/com-hour.css';

function ComHour(props) {
    const { display_date: displayDate, labelEdicionImpresa, size } = props;
    const { text: textEdicionImpresa } = labelEdicionImpresa || {};
    const adjustedTime = formatTimelineTime(displayDate);
    const { time: fallbackTime } = dateAndTimeUtil(displayDate);
    const time = adjustedTime || fallbackTime;
    return textEdicionImpresa !== 'Impresa' ? (
        <time className={`com-hour ${size || '--twoxs'}`}>{time}</time>
    ) : null;
}

ComHour.propTypes = {
    display_date: PropTypes.string.isRequired,
    labelEdicionImpresa: PropTypes.string,
    size: PropTypes.string
};

ComHour.defaultProps = {
    labelEdicionImpresa: null,
    size: ''
};

export default ComHour;
