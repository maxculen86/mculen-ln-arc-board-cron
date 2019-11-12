import React from 'react';
import PropTypes from 'fusion:prop-types';

const AmpImage = props => {
    const { sources, url, alt } = props;

    const srcset = sources
        .map(src => {
            if (src.resizedUrl && src.option.width)
                return `${src.resizedUrl} ${src.option.width}w`;
            return '';
        })
        .join(', ');
    return (
        <>
            <amp-img
                alt={alt}
                height="600"
                width="600"
                src={url}
                srcset={srcset}
                layout="fixed"
            />
        </>
    );
};

AmpImage.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            resizedUrl: PropTypes.string,
            option: PropTypes.shape({
                media: PropTypes.string,
                width: PropTypes.number
            })
        })
    ).isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

export default AmpImage;
