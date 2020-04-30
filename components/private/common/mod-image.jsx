/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-image.css';

const ModImage = props => {
    const { link, target, src, alt, amp } = props;
    const sizes = amp ? { width: 80, height: 80 } : {};
    if (!link || !src) return null;

    return (
        <ComLink
            link={link}
            title={alt}
            target={target}
            classCondition="mod-image"
        >
            <ComImage src={src} alt={alt} amp={amp} {...sizes} />
        </ComLink>
    );
};

ModImage.propTypes = {
    link: PropTypes.string.isRequired,
    target: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    amp: PropTypes.bool
};

export default ModImage;
