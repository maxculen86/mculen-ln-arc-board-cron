import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from '../common/imageBase';

const articleImage = ({ image, imageResizePresets, altText, zoom }) => {
    if (!imageResizePresets) return null;

    const sources = Object.keys(image.resized_urls)
        .filter(f => Object.keys(imageResizePresets).includes(f))
        .map(x => {
            const p = imageResizePresets[x];
            const url = image.resized_urls[x];
            return {
                media: p.media,
                class: p.class,
                url
            };
        });
    return <ImageBase sources={sources} altText={altText} zoom={zoom} />;
};

articleImage.propTypes = {
    image: PropTypes.shape({
        type: PropTypes.oneOf(['image']),
        resized_urls: PropTypes.objectOf(PropTypes.string).isRequired
    }).isRequired,
    imageResizePresets: PropTypes.objectOf(
        PropTypes.shape({
            class: PropTypes.string,
            media: PropTypes.string
        })
    ).isRequired,
    altText: PropTypes.string,
    zoom: PropTypes.bool
};

articleImage.defaultProps = {
    altText: '',
    zoom: false
};

export default articleImage;
