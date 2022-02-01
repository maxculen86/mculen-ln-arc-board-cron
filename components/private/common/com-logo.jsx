import React from 'react';
import PropTypes from 'prop-types';
import { ARC_STATIC } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import StaticValidation from './staticValidation';

import ComLink from './com-link';
import Image from './com-image';
import { mapperLogos } from './logos/mapperLogos';

import '../../../resources/dist/css/ln/components/com-logo.css';

const ComLogo = props => {
    const {
        logoName,
        size,
        width,
        height,
        classCondition,
        href,
        title,
        alt,
        folder,
        target,
        rel
    } = props;

    const { contextPath, deployment, outputType } = useAppContext();
    const folderRoute = folder ? folder : '';
    const assets = mapperLogos[logoName];
    const archivoSVG = `${ARC_STATIC}${deployment(
        `${contextPath}/resources/images/${folderRoute}${assets}`
    )}`;
    const sizeLogo = size ? size : '';
    const extraClass = `com-logo ${logoName} ${sizeLogo}`;
    const classes = `${classCondition} ${extraClass}`;
    const altProp = alt ? alt : title;

    const amp = outputType === 'amp' ? 'amp' : '';

    if (!logoName) return null;

    const Logo = (
        <StaticValidation id={assets || `logo-${logoName}`} htmlOnly persistent>
            <Image
                classCondition={classes}
                width={width}
                height={height}
                src={archivoSVG}
                alt={altProp}
                amp={amp}
                svg
            />
        </StaticValidation>
    );
    const Link = (
        <ComLink link={href} title={title} rel={rel} target={target}>
            {Logo}
        </ComLink>
    );
    return <>{href ? Link : Logo}</>;
};

ComLogo.propTypes = {
    logoName: PropTypes.string,
    size: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    classCondition: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string,
    folder: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.bool
};

ComLogo.defaultProps = {
    logoName: '',
    size: '',
    width: '50',
    height: '50',
    classCondition: '',
    href: '',
    title: '',
    alt: '',
    folder: '',
    target: undefined,
    rel: undefined
};
export default ComLogo;
