import React from 'react';
import PropTypes from 'fusion:prop-types';
import BaseImage from '../common/baseImage';
// import getProperties from 'fusion:properties';

const articleImage = ({ image, imageResizePresets, altText }) => {
    const sources = Object.keys(image.resized_urls).map(x => {
        const p = imageResizePresets[x];
        const url = image.resized_urls[x];
        return {
            media: p.media,
            class: p.class,
            url
        };
    });

    return <BaseImage sources={sources} altText={altText} />;
};

articleImage.propTypes = {
    image: PropTypes.shape({
        type: PropTypes.oneOf(['image']),
        resized_urls: PropTypes.array.isRequired
    }).isRequired,
    imageResizePresets: PropTypes.arrayOf(
        PropTypes.shape({
            media: PropTypes.string,
            class: PropTypes.string
        })
    ).isRequired,
    altText: PropTypes.string
};

articleImage.defaultProps = {
    altText: ''
};

export default articleImage;
