import React from 'react';
import BaseImage from '../common/baseImage';
import getProperties from 'fusion:properties';

const articleImage = ({ image, imageResizePresets }) => {
    const sources = Object.keys(image.resized_urls).map(x => {
        const p = imageResizePresets[x];
        const url = image.resized_urls[x];
        return {
            media: p.media,
            class: p.class,
            url: url
        };
    });

    return <BaseImage sources={sources} altText="texto alt" />;
};

export default articleImage;
