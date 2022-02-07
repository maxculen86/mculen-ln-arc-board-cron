import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from '../../common/utils/dateAndTimeUtil';

const DateHeader = ({ display_date, labelEdicionImpresa }) => {
    const { text: textEdicionImpresa } = labelEdicionImpresa || {};
    const { date, time } = dateAndTimeUtil(display_date);
    const timeOrNot = textEdicionImpresa !== 'Impresa' ? ` • ${time}` : '';

    return date && time ? (
        <p className="com-date --threexs">{`${date}${timeOrNot}`}</p>
    ) : null;
};

DateHeader.propTypes = {
    display_date: PropTypes.string.isRequired
};

export default DateHeader;
