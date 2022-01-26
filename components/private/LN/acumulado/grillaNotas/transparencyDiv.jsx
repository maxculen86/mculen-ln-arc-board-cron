import React from 'react';
import PropTypes from 'fusion:prop-types';

const TransparencyDiv = ({ size }) => (
    <div
        data-event="LinkClick"
        data-section="TransparencyNota"
        className="transparency"
        style={{ heigth: `${size}px` }}
    />
);

TransparencyDiv.propTypes = {
    size: PropTypes.number.isRequired
};

export default TransparencyDiv;
