import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';

const imageArticle = ({
    image,
    altText,
    zoom,
    configType,
    imageResizePresets,
    href
}) => {
    // TODO: analizar si se puede evitar tener que pasar el imagePresets como props
    if ((!imageResizePresets && !image.url) || !configType) return null;

    const sources =
        image.resized_urls &&
        Object.values(image.resized_urls).filter(v => !!v.option);

    return (
        <ImageBase
            urlDefault={image.url}
            sources={sources || []}
            altText={altText}
            zoom={zoom}
            href={href}
        />
    );
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
