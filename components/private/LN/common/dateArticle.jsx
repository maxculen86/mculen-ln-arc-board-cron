import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComDate from '../../../private/common/com-date';

const MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

function DateArticle({ display_date, hasTime }) {
    const date = new Date(display_date);
    return (
        /*         <h4 className="com-date">
            {`${date.getDate()} de ${
                MONTHS[date.getMonth()]
            } de ${date.getFullYear()}`}
            {hasTime && ` ● ${date.getHours()}:${date.getMinutes()}`}
        </h4> */
        <ComDate display_date={display_date} />
    );
}

DateArticle.propTypes = {
    display_date: PropTypes.string.isRequired,
    hasTime: PropTypes.bool
};

export default DateArticle;
