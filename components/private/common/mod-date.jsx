import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from '../common/utils/dateAndTimeUtil';
import ComDate from './com-date';
import ComHour from './com-hour';
import '../../../resources/dist/css/ln/modules/mod-date.css';

const ModDate = ({ display_date }) => {
    const { date, time } = dateAndTimeUtil('2020-04-16T18:14:28.467Z');
    if (!date || !time) return null;
    return date && time ? (
        <span className="mod-date">
            <ComDate date={date} />
            <ComHour>{time}</ComHour>
        </span>
    ) : (
        <span className="mod-date">
            <ComDate date={date} />
        </span>
    );
};

ModDate.propTypes = {
    display_date: PropTypes.string.isRequired
};

export default ModDate;
