import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { ARC_STATIC } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import { mapperLogos } from './mapperLogos';

const LogoComponent = props => {
    const { outputType, name, classCondition, size, href } = props;
    const { contextPath, deployment } = useAppContext();
    const assets = mapperLogos[name];
    const archivoSVG = `${ARC_STATIC}${deployment(
        `${contextPath}/resources/images/${assets}`
    )}`;
    const sizeLogo = size ? size : '';
    const extraClass = classCondition ? classCondition : `${assets}${sizeLogo}`;
    const hrefProps = href ? href : '';

    return (
        <Static id={assets || `logo-${name}`} htmlOnly>
            <img
                href={hrefProps}
                classCondition={extraClass}
                target="_blank"
                src={archivoSVG}
                alt={name}
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
    size: PropTypes.string,
    alt: PropTypes.string
};

export default LogoComponent;
