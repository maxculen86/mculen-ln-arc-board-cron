import Consumer from 'fusion:consumer';
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';
import AmpImage from '../../ampImage';

/**
 *
 * TODO: Optmizar la asignacion de variables como estados del componente proque
 * esta rendereando multiples veces
 */

const ImageArticle = ({ image, zoom, href, outputType, active }) => {
    const { alt_text: altText, caption } = image;
    const altBasic = altText || caption || '';
    if (!image.url) return null;
    const amp = outputType === 'amp';

    const sources =
        image.resized_urls && image.resized_urls.filter(v => !!v.option);
    const sourcesZoom =
        image.resized_urls_zoom &&
        image.resized_urls_zoom.filter(v => !!v.option);

    /**
     * TODO: Cambiar esta negrada
     */
    const isVertical = image.height > image.width;
    const sourceActive = active ? sourcesZoom : sources;

    // TODO: ver este tema de source sets con maquetacion
    let srcset = sourceActive.map(src => {
        const {
            option: { width: _w, height: _h }
        } = src;

        if (src.resizedUrl && !isVertical && _w)
            return `${src.resizedUrl} ${src.option.width}w`;

        if (src.resizedUrl && isVertical && _h)
            return `${src.resizedUrl} ${src.option.height}w`;

        return '';
    });
    srcset = srcset && srcset.length > 1 ? srcset.join(', ') : srcset;

    if (srcset.length === 1) srcset = `${image.url} ${image.width}w`;

    return (
        <ImageBase
            srcsetAMP={srcset}
            active={active}
            urlDefault={image.url}
            sources={sources || []}
            altText={altBasic}
            zoom={zoom}
            sourcesZoom={sourcesZoom || []}
            href={href}
            width={image.width}
            height={image.height}
            amp={amp}
        />
    );
};

ImageArticle.propTypes = {
    outputType: PropTypes.string.isRequired,
    image: PropTypes.shape({
        type: PropTypes.oneOf(['image']),
        url: PropTypes.string,
        resized_urls: PropTypes.array.isRequired,
        resized_urls_zoom: PropTypes.array.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        alt_text: PropTypes.string,
        caption: PropTypes.string
    }).isRequired,
    zoom: PropTypes.bool,
    active: PropTypes.bool.isRequired,
    href: PropTypes.string
};

export default Consumer(ImageArticle);
