import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

const ComFigure = ({ classCondition, children, handleClick, outputType }) => {
    const amp = outputType === 'amp';
    return children ? (
        <figure
            role="button"
            onClick={handleClick}
            onKeyDown={handleClick}
            className={`mod-figure ${classCondition}`}
        >
            {children}
        </figure>
    ) : (
        <></>
    );
};

ComFigure.propTypes = {
    children: PropTypes.elementType.isRequired,
    classCondition: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    outputType: PropTypes.string.isRequired
};

export default ComFigure;
