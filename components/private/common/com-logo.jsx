import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-logo.css';

const ComLogo = props => {
    const { logoName } = props;
    if (!logoName) return null;
    return <i className={`com-logo logo-${logoName}`} />;
};

ComLogo.propTypes = {
    logoName: PropTypes.string.isRequired
};

export default ComLogo;
