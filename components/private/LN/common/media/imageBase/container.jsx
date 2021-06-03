import Consumer from 'fusion:consumer';
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';

/**
 *
 * TODO: Optmizar la asignacion de variables como estados del componente proque
 * esta rendereando multiples veces
 */

class ImageArticle extends React.PureComponent {
    render() {
        const { image, zoom, href, outputType, active, withLazy } = this.props;
        const { alt_text: altText, caption, titleText } = image;
        const altBasic = altText || caption || titleText || '';
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
        const seenWidthOrPixelDensity = [];
        let srcset =
            sourceActive &&
            sourceActive.map(src => {
                const {
                    option: { width: _w, height: _h }
                } = src;

                let widthOrPixelDensity = null;

                if (src.resizedUrl && !isVertical && _w)
                    widthOrPixelDensity = `${src.option.width}w`;

                if (src.resizedUrl && isVertical && _h)
                    widthOrPixelDensity = `${src.option.height}w`;

                if (
                    !widthOrPixelDensity ||
                    seenWidthOrPixelDensity.includes(widthOrPixelDensity)
                )
                    return '';

                seenWidthOrPixelDensity.push(widthOrPixelDensity);
                return `${src.resizedUrl} ${widthOrPixelDensity}`;
            });
        srcset = srcset && srcset.length > 1 ? srcset.join(', ') : srcset;

        if (srcset && srcset.length === 1)
            srcset = `${image.url} ${image.width}w`;

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
                withLazy={withLazy}
            />
        );
    }
}

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
    href: PropTypes.string,
    withLazy: PropTypes.bool
};

export default Consumer(ImageArticle);
