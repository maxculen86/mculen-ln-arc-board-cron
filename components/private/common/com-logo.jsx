import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { cx } from '@ln/cva';
import getAssetsPath from './utils/getAssetsPath';

import ComLink from './com-link';
import Image from './com-image';

import '../../../resources/dist/css/ln/components/com-logo.css';

// TODO: CREAR ID UNICO PARA STATIC QUE LLEGUE DESDE EL FEATURE QUE SE IMPORTE
function ComLogo({
    logoName = '',
    size = '',
    width = 'inherit',
    height = 'inherit',
    classCondition = '',
    classnames = '',
    href = '',
    title = '',
    alt = '',
    target,
    rel,
    folder = ''
}) {
    const { contextPath, deployment } = useAppContext();
    const classes = cx(
        classCondition,
        'com-logo',
        logoName,
        size,
        classnames?.logo
    );

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
            classCondition={cx(
                '--logo container-center-100 block',
                classnames?.link
            )}
        >
            {Logo}
        </ComLink>
    );

    return href ? Link : Logo;
}

export default ComLogo;
