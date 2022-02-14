import React from 'react';
import PropTypes from 'prop-types';
import dateAndTimeUtil from '../../common/utils/dateAndTimeUtil';

const DateHeader = ({ display_date: displayDate, labelEdicionImpresa }) => {
    const { edicion: { text: textEdicionImpresa } = {} } =
        labelEdicionImpresa || {};

    const { date, time } = dateAndTimeUtil(displayDate);
    const timeOrNot = textEdicionImpresa !== 'Impresa' ? ` • ${time}` : '';

    return displayDate && date && time ? (
        <p className="com-date --threexs">{`${date}${timeOrNot}`}</p>
    ) : null;
};

DateHeader.propTypes = {
    display_date: PropTypes.string.isRequired,
    labelEdicionImpresa: PropTypes.string
};
DateHeader.defaultProps = {
    labelEdicionImpresa: null
};

export default DateHeader;
