import React from 'react';
import PropTypes from 'fusion:prop-types';
import Placeholder from '../../imagePlaceholder';
import ComImage from '../../../../common/com-image';
import ComSource from '../../../../common/com-source';

const imageBase = ({
    urlDefault,
    sources,
    sourcesZoom,
    altText,
    zoom,
    href,
    height,
    width
}) => {
    const isVertical = height > width;
    /**
     * TODO: Ver los sources para apertura con destacado, no se le esta pasando la prop al componente media.
     * Entonces no se le pueden setear srcset al tag amp-img
     * Adicional: dudas arquitectura tomando en cuenta la variante de "AMP".
     * Gut feeling: probablemente una buena decisión inicial hubiese sido utilizar el patrón comportamental strategy
     */

    const pic = (
        <Placeholder href={href} zoom={zoom} isVertical={isVertical}>
            {sources &&
                sources.map(x => {
                    return (
                        <ComSource
                            key={x.option.media}
                            media={x.option.media}
                            srcset={x.resizedUrl}
                        />
                    );
                })}
            <ComImage src={urlDefault} alt={altText} />
            <ComImage classCondition="--large" src={urlDefault} alt={altText} />
        </Placeholder>
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
