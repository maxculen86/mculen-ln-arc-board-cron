import React from 'react';
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

export default PreloadImages;
