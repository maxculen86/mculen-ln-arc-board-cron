import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from '../../common/utils/dateAndTimeUtil';

const DateHeader = ({ display_date }) => {
    const { date, time } = dateAndTimeUtil(display_date);
    return date && time ? (
        <p className="com-date">{`${date} • ${time}`}</p>
    ) : null;
};

DateHeader.propTypes = {
    display_date: PropTypes.string.isRequired
};

export default DateHeader;
