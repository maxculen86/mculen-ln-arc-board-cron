import React from 'react';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

const PreloadImages = ({ resizedUrls = [] }) => {
    if (resizedUrls.length === 0) return <></>;
    const images = getImagesToLoadWithPicture(resizedUrls, true);

    return images.map(({ mediaPreload, href } = {}) => (
        <link
            key={href}
            rel="preload"
            as="image"
            fetchpriority="high"
            media={mediaPreload}
            href={href}
        />
    ));
};

export default PreloadImages;
