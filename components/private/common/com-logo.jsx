import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-logo.css';

const ComLogo = props => {
    const { logoName, color, size, classCondition } = props;
    if (!logoName) return null;
    return (
        <i
            className={`com-logo logo-${
                logoName ? logoName : ''
            } ${classCondition || ''} ${color ? '--color' : ''} ${size || ''}`}
        />
    );
};

ComLogo.propTypes = {
    logoName: PropTypes.string.isRequired,
    color: PropTypes.bool.isRequired,
    size: PropTypes.string
};

export default ComLogo;
