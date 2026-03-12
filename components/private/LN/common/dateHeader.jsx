import React from 'react';
import dateAndTimeUtil from '../../common/utils/dateAndTimeUtil';

function DateHeader({ display_date: displayDate, labelEdicionImpresa }) {
    const { edicion: { text: textEdicionImpresa } = {} } =
        labelEdicionImpresa || {};

    const { date, time } = dateAndTimeUtil(displayDate);
    const timeOrNot = textEdicionImpresa !== 'Impresa' ? ` • ${time}` : '';

    return displayDate && date && time ? (
        <p className="com-date --threexs">{`${date}${timeOrNot}`}</p>
    ) : null;
}

export default DateHeader;
