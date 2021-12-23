import React from 'react';
import PropTypes from 'prop-types';
import LogoComponent from '../common/logos/LogoComponent';

import '../../../resources/dist/css/ln/components/com-logo.css';

const ComLogo = props => {
    const { logoName, size, classCondition } = props;

    if (!logoName) return null;
    return (
        <LogoComponent
            name={logoName}
            size={size}
            classCondition={classCondition}
        />
    );
};

ComLogo.propTypes = {
    logoName: PropTypes.string,
    classCondition: PropTypes.string,
    size: PropTypes.string
};

ComLogo.defaultProps = {
    classCondition: '',
    logoName: '',
    size: ''
};
export default ComLogo;
