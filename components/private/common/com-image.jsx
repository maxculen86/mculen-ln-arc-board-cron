/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import ComLink from './com-link';

import '../../../resources/dist/css/ln/components/com-image.css';
import '../../../resources/dist/css/ln/modules/mod-media.css';

function ComImage({
    src,
    srcset,
    alt,
    classCondition = '',
    width,
    height,
    href = '',
    target = '',
    isApertura = false,
    svg = false,
    searchableField
}) {
    if (!src) return null;

    const commonProps = {
        src,
        alt,
        width,
        height
    };

    const classes = `${svg ? '' : 'com-image'} ${classCondition || ''}`;

    const image = (
        <img
            {...commonProps}
            {...searchableField}
            className={classes}
            srcSet={srcset}
            loading={isApertura ? 'eager' : 'lazy'}
            fetchPriority={isApertura ? 'high' : 'low'}
            decoding="async"
        />
    );

    return href ? (
        <ComLink link={href} target={target || ''} title={alt}>
            {image}
        </ComLink>
    ) : (
        image
    );
}

export default ComImage;
