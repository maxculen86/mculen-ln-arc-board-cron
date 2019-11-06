import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';

const imageArticle = ({ image, altText, zoom, href }) => {
    if (!image.url) return null;

    const sources =
        image.resized_urls && image.resized_urls.filter(v => !!v.option);

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
        url: PropTypes.string,
        resized_urls: PropTypes.array.isRequired
    }).isRequired,
    altText: PropTypes.string,
    zoom: PropTypes.bool,
    href: PropTypes.string
};

// imageArticle.defaultProps = {
//     altText: '',
//     zoom: false,
//     href: ''
// };

export default imageArticle;
