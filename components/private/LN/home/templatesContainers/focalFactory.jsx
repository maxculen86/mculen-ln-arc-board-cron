import React from 'react';
import PropTypes from 'fusion:prop-types';
import FocalIzquierdo from './focalIzquierdo';
import FocalDerecho from './focalDerecho';
// import './focalFactory.css';

const FocalFactory = ({ directionFocal, children }) => {
    if (directionFocal === 'FocalDerecho')
        return <FocalDerecho>{children}</FocalDerecho>;
    if (directionFocal === 'FocalIzquierdo')
        return <FocalIzquierdo>{children}</FocalIzquierdo>;
    return null;
};

FocalFactory.propTypes = {
    directionFocal: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default FocalFactory;
