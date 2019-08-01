/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from '../../../common/utils/dateAndTimeUtil';

const DateHeader = ({ display_date }) => {
    const { date, time } = dateAndTimeUtil(display_date);

    // TODO: Falta definir el html de este componente
    // TODO: Falta definir que va a retornar si no viene fecha y time
    return date && time ? (
        <div>
            {`${date} · `}
            <strong>{`${time}`}</strong>
        </div>
    ) : null;
};

DateHeader.propTypes = {
    display_date: PropTypes.string.isRequired
};

export default DateHeader;
