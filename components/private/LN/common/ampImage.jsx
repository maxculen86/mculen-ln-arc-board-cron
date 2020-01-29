import React from 'react';
import PropTypes from 'fusion:prop-types';

const AmpImage = props => {
    const { sources, url, alt, width } = props;

    // TODO: ver este tema de source sets con maquetacion
    let srcset = sources
        .map(src => {
            if (src.resizedUrl && src.option.width)
                return `${src.resizedUrl} ${src.option.width}w`;
            return '';
        })
        .join(', ');

    // Si no tiene source sets le seteo uno temporal
    if (srcset.length < 1) srcset = `${url} ${width}w`;

    return (
        <>
            <amp-img
                alt={alt}
                height="853.33"
                width="1280"
                src={url}
                srcset={srcset}
                layout="responsive"
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
    alt: PropTypes.string.isRequired,
    width: PropTypes.number
};

export default AmpImage;
