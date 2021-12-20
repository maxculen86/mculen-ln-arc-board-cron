import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { ARC_STATIC } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import { mapperLogos } from './mapperLogos';

const LogoComponent = props => {
    const { outputType, name, width, height, classCondition, href } = props;
    const { contextPath, deployment } = useAppContext();
    const assets = mapperLogos[name];
    const archivoSVG = `${ARC_STATIC}${deployment(
        `${contextPath}/resources/images/${assets}`
    )}`;

    return (
        <Static id={assets || `logo-${name}`} htmlOnly>
            <img
                href={href}
                className={classCondition}
                target="_blank"
                src={archivoSVG}
                alt={name}
                width={width}
                height={height}
                amp={outputType === 'amp'}
            />
        </Static>
    );
};

LogoComponent.propTypes = {
    outputType: PropTypes.string.isRequired,
    name: PropTypes.string,
    classCondition: PropTypes.string,
    href: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    alt: PropTypes.string
};

export default LogoComponent;
