import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';

const imageArticle = ({ image, altText, zoom, configType, href }) => {
    if (!image.url) return null;

    const sources =
        image.resized_urls &&
        image.resized_urls.filter(
            v => !!v.option && (!configType || v.option.type === configType)
        );

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
    altText: PropTypes.string,
    zoom: PropTypes.bool,
    configType: PropTypes.string.isRequired
};

imageArticle.defaultProps = {
    altText: '',
    zoom: false
};

export default imageArticle;
