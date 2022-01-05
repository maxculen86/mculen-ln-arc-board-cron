import React from 'react';
import PropTypes from 'prop-types';
import ComLink from './com-link';
import Static from 'fusion:static';
import { ARC_STATIC } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
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
        amp,
        target,
        rel
    } = props;

    const { contextPath, deployment } = useAppContext();
    const folderRoute = folder ? folder : '/resources/images/';
    const assets = mapperLogos[logoName];
    const archivoSVG = `${ARC_STATIC}${deployment(
        `${contextPath}${folderRoute}${assets}`
    )}`;
    const sizeLogo = size ? size : '';
    const extraClass = `com-logo${' '}${logoName}${' '}${sizeLogo}`;
    const classes = `${classCondition}${' '}${extraClass}`;
    const targetProp = target ? target : '_blank';
    const altProp = alt ? alt : title;

    if (!logoName) return null;

    const Logo = (
        <Static id={assets || `logo-${logoName}`} htmlOnly>
            <img
                className={classes}
                width={width}
                height={height}
                src={archivoSVG}
                amp={amp}
                alt={altProp}
                loading="lazy"
            />
        </Static>
    );
    const Link = (
        <ComLink link={href} title={title} rel={rel} target={targetProp}>
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
    size: PropTypes.string,
    amp: PropTypes.string
};

ComLogo.defaultProps = {
    title: '',
    href: '',
    classCondition: '',
    logoName: '',
    size: ''
};
export default ComLogo;
