import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from '../common/utils/dateAndTimeUtil';
import '../../../resources/dist/css/ln/components/com-hour.css';

const ComHour = ({ display_date }) => {
    const { time } = dateAndTimeUtil(display_date);
    return <time className="com-hour">{time}</time>;
};

export default ComHour;
