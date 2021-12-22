import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { ARC_STATIC } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import { mapperLogos } from './mapperLogos';

import '../../../../resources/dist/css/ln/components/com-logo.css';

const LogoComponent = props => {
    const {
        outputType,
        name,
        classCondition,
        size,
        href,
        width,
        height,
        alt
    } = props;
    const { contextPath, deployment } = useAppContext();
    const assets = mapperLogos[name];
    const archivoSVG = `${ARC_STATIC}${deployment(
        `${contextPath}/resources/images/${assets}`
    )}`;
    const sizeLogo = size ? size : '';
    const extraClass = `com-logo${' '}${name}${' '}${sizeLogo}`;
    const hrefProps = href ? href : '';
    const classes = classCondition ? classCondition : extraClass;
    const altProps = alt ? alt : name;

    return (
        <Static id={assets || `logo-${name}`} htmlOnly>
            <img
                href={hrefProps}
                className={classes}
                target="_blank"
                width={width}
                height={height}
                src={archivoSVG}
                alt={altProps}
                amp={outputType === 'amp'}
            />
        </Static>
    );
};

LogoComponent.propTypes = {
    outputType: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    classCondition: PropTypes.string,
    href: PropTypes.string,
    size: PropTypes.string,
    alt: PropTypes.string
};

export default LogoComponent;
