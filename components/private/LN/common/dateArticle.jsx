import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../resources/dist/css/ln/components/date.css';

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
        <h4 className="com-date">
            {`${date.getDate()} de ${
                MONTHS[date.getMonth()]
            } de ${date.getFullYear()}`}
            {hasTime && ` ● ${date.getHours()}:${date.getMinutes()}`}
        </h4>
    );
}

DateArticle.propTypes = {
    display_date: PropTypes.string.isRequired,
    hasTime: PropTypes.bool
};

// DateArticle.defaultProps = {
//     hasTime: false
// };

export default DateArticle;
