import React from 'react';
import PropTypes from 'fusion:prop-types';

const AmpImage = props => {
    const { sources, url, alt, width, height } = props;

    const isVertical = height > width;

    // TODO: ver este tema de source sets con maquetacion
    console.log('sources ************* ', sources);
    let srcset = sources
        .map(src => {
            if (src.resizedUrl && !isVertical)
                return `${src.resizedUrl} ${width}w`;
            if (src.resizedUrl && isVertical) {
                return `${src.resizedUrl} ${height}w`;
            }
            return '';
        })
        .join(', ');

    // Si no tiene source sets le seteo uno temporal
    if (srcset.length < 1) srcset = `${url} ${width}w`;

    return (
        <div className={isVertical ? 'contain-vertical' : 'contain-horizontal'}>
            <amp-img
                class="contain"
                alt={alt}
                height={height}
                width={width}
                src={url}
                srcset={srcset}
                layout={isVertical ? 'fill' : 'responsive'}
            />
        </div>
    );
};

AmpImage.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            resizedUrl: PropTypes.string,
            option: PropTypes.shape({
                media: PropTypes.string,
                width: PropTypes.number,
                height: PropTypes.number
            })
        })
    ).isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
};

export default AmpImage;
