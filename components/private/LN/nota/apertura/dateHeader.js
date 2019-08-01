import React from 'react';
import PropTypes from 'fusion:prop-types';

//TODO: falta html
const DateHeader = ({ date, time }) =>
    date && time ? (
        <div>
            {`${date} · `}
            <strong>{`${time}`}</strong>
        </div>
    ) : (
        //TODO: que hacer cuando no tenemos los datos para renderar?
        <p>Sin fecha</p>
    );

DateHeader.propTypes = {
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
};

export default DateHeader;
