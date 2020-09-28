import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-logo.css';

const ComLogo = props => {
    const { logoName, color, size } = props;
    if (!logoName) return null;
    return (
        <i
            className={`com-logo logo-${logoName} ${color ? '--color' : ''} ${
                size ? size : ''
            }`}
        />
    );
};

ComLogo.propTypes = {
    logoName: PropTypes.string.isRequired,
    color: PropTypes.bool.isRequired
};

export default ComLogo;
