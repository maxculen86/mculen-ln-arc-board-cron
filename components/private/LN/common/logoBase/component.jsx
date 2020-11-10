import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLogo from '../../../common/com-logo';
import ComLink from '../../../common/com-link';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../common/utils/subtypes/subtypeHelper';

const LogoBaseComponent = ({ path, logoName, color, subtype }) => {
    if (!logoName) return null;
    const size =
        subtype === FOTOAL100 || subtype === STORYTELLING ? '--sm' : '--xs';
    const Logo = <ComLogo logoName={logoName} color={color} size={size} />;
    const Link = <ComLink link={path}>{Logo}</ComLink>;
    return <>{path ? Link : Logo}</>;
};

LogoBaseComponent.propTypes = {
    path: PropTypes.string.isRequired,
    logoName: PropTypes.string.isRequired,
    color: PropTypes.bool.isRequired,
    subtype: PropTypes.string.isRequired
};

export default LogoBaseComponent;
