import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import getAssetsPath from './utils/getAssetsPath';

import ComLink from './com-link';
import Image from './com-image';

import '../../../resources/dist/css/ln/components/com-logo.css';

//TODO: CREAR ID UNICO PARA STATIC QUE LLEGUE DESDE EL FEATURE QUE SE IMPORTE
const ComLogo = props => {
    const {
        logoName,
        size = '',
        width,
        height,
        classCondition,
        href,
        title,
        alt,
        target,
        rel,
        folder = ''
    } = props;

    const { contextPath, deployment } = useAppContext();
    const extraClass = `com-logo ${logoName} ${size || ''}`;
    const classes = `${classCondition} ${extraClass}`;

    if (!logoName) return null;

    const Logo = (
        <Static id={`com-logo-${logoName}-${size}`} htmlOnly>
            <Image
                classCondition={classes}
                width={width}
                height={height}
                src={getAssetsPath(contextPath)(deployment)(
                    `${folder}${logoName}.svg`
                )}
                alt={alt || title}
                svg
            />
        </Static>
    );

    const Link = (
        <ComLink
            link={href}
            title={title}
            rel={rel}
            target={target}
            classCondition="--logo"
        >
            {Logo}
        </ComLink>
    );

    return <>{href ? Link : Logo}</>;
};

ComLogo.propTypes = {
    logoName: PropTypes.string,
    size: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
