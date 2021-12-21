import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { ARC_STATIC } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

import '../../../../src/statics/LN/css/components/com-logo.scss';

import { mapperLogos } from './mapperLogos';

const LogoComponent = props => {
    const { outputType, name, classCondition, size } = props;
    const { contextPath, deployment } = useAppContext();
    const assets = mapperLogos[name];
    const archivoSVG = `${ARC_STATIC}${deployment(
        `${contextPath}/resources/images/${assets}`
    )}`;

    return (
        <Static id={assets || `logo-${name}`} htmlOnly>
            <img
                href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,,"
                className={classCondition ? classCondition : `${assets}${size}`}
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
    size: PropTypes.number,
    alt: PropTypes.string
};

export default LogoComponent;
