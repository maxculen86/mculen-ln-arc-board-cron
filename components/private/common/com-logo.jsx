import React from 'react';
import PropTypes from 'prop-types';
import LogoComponent from '../common/logos/LogoComponent';

import '../../../resources/dist/css/ln/components/com-logo.css';
import ComLink from './com-link';

const ComLogo = props => {
    const {
        logoName,
        size,
        width,
        height,
        classCondition,
        href,
        title
    } = props;

    if (!logoName) return null;

    const Logo = (
        <LogoComponent
            width={width}
            height={height}
            name={logoName}
            size={size}
            classCondition={classCondition}
        />
    );
    const Link = (
        <ComLink link={href} title={title}>
            {Logo}
        </ComLink>
    );
    return <>{href ? Link : Logo}</>;
};

ComLogo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    href: PropTypes.string,
    title: PropTypes.string,
    logoName: PropTypes.string,
    classCondition: PropTypes.string,
    size: PropTypes.string
};

ComLogo.defaultProps = {
    title: '',
    href: '',
    classCondition: '',
    logoName: '',
    size: ''
};
export default ComLogo;
