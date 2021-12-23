import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLogo from '../../../common/com-logo';
import ComLink from '../../../common/com-link';

const LogoBaseComponent = ({ path, logoName, color }) => {
    if (!logoName) return null;
    const Logo = <ComLogo logoName={logoName} size="--sm" />;
    const Link = <ComLink link={path}>{Logo}</ComLink>;
    return <>{path ? Link : Logo}</>;
};

LogoBaseComponent.propTypes = {
    path: PropTypes.string.isRequired,
    logoName: PropTypes.string.isRequired,
    color: PropTypes.bool.isRequired
};

export default LogoBaseComponent;
