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
        width,
        height,
        folder
    } = props;
    const { contextPath, deployment } = useAppContext();
    const folderRoute = folder ? folder : '/resources/images/';
    const assets = mapperLogos[name];
    const archivoSVG = `${ARC_STATIC}${deployment(
        `${contextPath}${folderRoute}${assets}`
    )}`;
    const sizeLogo = size ? size : '';
    const extraClass = `com-logo${' '}${name}${' '}${sizeLogo}`;
    const classes = `${classCondition}${' '}${extraClass}`;

    return (
        <Static id={assets || `logo-${name}`} htmlOnly>
            <img
                className={classes}
                target="_blank"
                width={width}
                height={height}
                src={archivoSVG}
                amp={outputType === 'amp'}
            />
        </Static>
    );
};

LogoComponent.propTypes = {
    outputType: PropTypes.string,
    folder: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    classCondition: PropTypes.string,
    size: PropTypes.string
};

export default LogoComponent;
