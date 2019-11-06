import Consumer from 'fusion:consumer';
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';
import AmpImage from '../../ampImage';

const imageArticle = ({ image, altText, zoom, href, outputType }) => {
    if (!image.url) return null;
    const amp = outputType === 'amp';

    const sources =
        image.resized_urls && image.resized_urls.filter(v => !!v.option);

    return (
        <>
            {amp ? (
                <AmpImage
                    sources={sources}
                    url={image.url}
                    alt={altText || ''}
                />
            ) : (
                <ImageBase
                    urlDefault={image.url}
                    sources={sources || []}
                    altText={altText}
                    zoom={zoom}
                    href={href}
                />
            )}
        </>
    );
};

imageArticle.propTypes = {
    outputType: PropTypes.string.isRequired,
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

export default Consumer(imageArticle);
