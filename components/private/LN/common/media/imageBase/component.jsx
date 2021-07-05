import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComPicture from '../../../../common/com-picture';
import ComImage from '../../../../common/com-image';
import ComSource from '../../../../common/com-source';

// TODO: Este componentes ahora esta en components/private/LN/common/media/imageBase/index.jsx.
// Borrar a futuro

const imageBase = ({
    srcsetAMP,
    urlDefault,
    sources,
    sourcesZoom,
    altText,
    href,
    height,
    width,
    active,
    amp,
    withLazy
}) => {
    /**
     * TODO: Ver los sources para apertura con destacado, no se le esta pasando la prop al componente media.
     * Entonces no se le pueden setear srcset al tag amp-img
     * Adicional: dudas arquitectura tomando en cuenta la variante de "AMP".
     * Gut feeling: probablemente una buena decisión inicial hubiese sido utilizar el patrón comportamental strategy
     */

    const pic = (
        <ComPicture href={href} amp={amp}>
            {!active &&
                !amp &&
                sources &&
                sources.map(x => {
                    return (
                        <ComSource
                            key={x.option.media}
                            media={x.option.media}
                            srcset={x.resizedUrl}
                        />
                    );
                })}
            {!active && (
                <ComImage
                    srcsetAMP={srcsetAMP}
                    src={urlDefault}
                    alt={altText}
                    amp={amp}
                    height={height}
                    width={width}
                />
            )}
            {active &&
                sourcesZoom &&
                sourcesZoom.map(x => {
                    return (
                        <ComSource
                            key={x.option.media}
                            media={x.option.media}
                            srcset={x.resizedUrl}
                        />
                    );
                })}
            {active && (
                <ComImage
                    src={urlDefault}
                    alt={altText}
                    amp={amp}
                    height={height}
                    width={width}
                    withLazy={withLazy}
                />
            )}
        </ComPicture>
    );
    return pic;
};

imageBase.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            media: PropTypes.string,
            class: PropTypes.string,
            resizedUrl: PropTypes.string
        })
    ),
    altText: PropTypes.string,
    zoom: PropTypes.bool,
    href: PropTypes.string
};

export default imageBase;
