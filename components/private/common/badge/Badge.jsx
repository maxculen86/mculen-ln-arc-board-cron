import React from 'react';
import PropTypes from 'prop-types';

import '../../../../resources/dist/css/ln/components/badge.css';
import Live from '../live';

const propTypes = {
    /**
     * Clases adicionales.
     */
    className: PropTypes.string,
    /**
     * Tipo del badge.
     */
    type: PropTypes.oneOf(['sponsored', 'a-fondo', 'liveblog'])
};

const Badge = ({ children, className, type, ...r }) => {
    return (
        <span
            className={`badge --sixxs ${className} ${
                type === 'liveblog' || 'a-fondo' ? `--${type}` : ``
            }`}
            {...r}
        >
            {type === 'liveblog' && <Live />}
            {children}
        </span>
    );
};

Badge.propTypes = propTypes;

export default Badge;
