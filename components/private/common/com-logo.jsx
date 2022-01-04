import React from 'react';
import PropTypes from 'prop-types';
import SvgToImage from '../common/logos/SvgToImage';

import '../../../resources/dist/css/ln/components/com-logo.css';
import ComLink from './com-link';

const ComLogo = props => {
    const {
        id,
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
        <SvgToImage
            width={width}
            height={height}
            name={logoName}
            size={size}
            classCondition={classCondition}
        />
    );
    const Link = (
        <ComLink link={href} title={title} id={id}>
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
