import React from 'react';
import PropTypes from 'prop-types';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

function PreloadImages({ resizedUrls = [] }) {
    if (resizedUrls.length === 0) return null;
    const images = getImagesToLoadWithPicture(true, resizedUrls);

    return images.map(({ mediaPreload, href } = {}) => (
        <link
            key={href}
            rel="preload"
            as="image"
            fetchPriority="high"
            media={mediaPreload}
            href={href}
        />
    ));
}
PreloadImages.propTypes = {
    resizedUrls: PropTypes.arrayOf(
        PropTypes.shape({
            mediaPreload: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired
        })
    )
};

PreloadImages.defaultProps = {
    resizedUrls: []
};

export default PreloadImages;
