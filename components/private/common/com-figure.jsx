import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

const ComFigure = ({ classCondition, withZoom, children }) => {
    const [active, setActive] = useState(false);
    const handleClick = () => {
        if (withZoom) {
            setActive(!active);
        }
    };

    return children ? (
        <figure
            role="button"
            onClick={handleClick}
            onKeyDown={handleClick}
            className={`mod-figure ${classCondition} ${withZoom || ''} ${
                withZoom && active ? '--active' : ''
            }`}
        >
            {children}
        </figure>
    ) : (
        <></>
    );
};

ComFigure.propTypes = {
    children: PropTypes.elementType.isRequired,
    withZoom: PropTypes.string.isRequired,
    classCondition: PropTypes.string.isRequired
};

export default ComFigure;
