import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLogo from '../../../common/com-logo';
import ComLink from '../../../common/com-link';

const LogoBaseComponent = ({ path, logoName, color }) => {
    console.log('LogoBaseComponent -> color', color);
    console.log('LogoBaseComponent -> logoName', logoName);
    console.log('LogoBaseComponent -> path', path);
    if (!logoName) return null;
    const Logo = <ComLogo logoName={logoName} color={color} />;
    const Link = <ComLink link={path}>{Logo}</ComLink>;
    if (logoName === 'bbc') return <>{Logo}</>;
    return <>{path ? Link : Logo}</>;
};

LogoBaseComponent.propTypes = {
    path: PropTypes.string.isRequired,
    logoName: PropTypes.string.isRequired,
    color: PropTypes.bool.isRequired
};

export default LogoBaseComponent;
