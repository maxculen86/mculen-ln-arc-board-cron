import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';

const imageArticle = ({
    image,
    imageResizePresets,
    altText,
    zoom,
    configType
}) => {
    if (!imageResizePresets || !configType) return null;

    const sources = Object.keys(image.resized_urls).reduce(
        (filtered, value) => {
            const p = imageResizePresets[value];
            if (p.type === configType) {
                const url = image.resized_urls[value];
                filtered.push({
                    media: p.media,
                    class: p.class,
                    url
                });
            }
            return filtered;
        },
        []
    );
    return <ImageBase sources={sources} altText={altText} zoom={zoom} />;
};

imageArticle.propTypes = {
    image: PropTypes.shape({
        type: PropTypes.oneOf(['image']),
        resized_urls: PropTypes.objectOf(PropTypes.string).isRequired
    }).isRequired,
    imageResizePresets: PropTypes.objectOf(
        PropTypes.shape({
            class: PropTypes.string,
            media: PropTypes.string,
            type: PropTypes.string
        })
    ).isRequired,
    altText: PropTypes.string,
    zoom: PropTypes.bool,
    configType: PropTypes.string.isRequired
};

imageArticle.defaultProps = {
    altText: '',
    zoom: false
};

export default imageArticle;
