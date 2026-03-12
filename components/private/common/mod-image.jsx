/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import ComLink from './com-link';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-image.css';

function ModImage(props) {
    const { link, target, src, alt, isApertura = false } = props;
    if (!link || !src) return null;

    return (
        <ComLink
            link={link}
            title={alt}
            target={target}
            classCondition="mod-image"
        >
            <ComImage src={src} alt={alt} isApertura={isApertura} />
        </ComLink>
    );
}

export default ModImage;
