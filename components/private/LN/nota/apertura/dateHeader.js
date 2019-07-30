import React from 'react';
import PropTypes from 'fusion:prop-types';

const DateHeader = ({ date, time }) =>
    date && time ? (
        <div>
            {`${date} · `}
            <strong>{`${time}`}</strong>
        </div>
    ) : (
        <p>Sin fecha</p>
    );

DateHeader.propTypes = {
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
};

export default DateHeader;
