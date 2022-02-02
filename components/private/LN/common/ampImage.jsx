import React from 'react';
import PropTypes from 'fusion:prop-types';
import EpigrafeAndCreditsData from '../../common/utils/epigrafeAndCreditsData';
import ComFigcaption from '../../common/com-figcaption';
import ComText from '../../common/text';

const AmpImage = props => {
    const {
        sources,
        url,
        alt,
        width,
        height,
        layout,
        sourcesZoom,
        active,
        caption,
        mediaData
    } = props;
    const credito = EpigrafeAndCreditsData(mediaData);
    const isVertical = height > width;
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

    if (srcset.length === 1) srcset = `${url} ${width}w`;

    return (
        <figure
            className={`mod-figure figure ${
                isVertical ? 'contain-vertical' : 'contain-horizontal'
            }`}
        >
            <div className="placeholder content-pic picture">
                <amp-img
                    alt={alt}
                    height={height}
                    width={width}
                    src={url}
                    srcset={srcset}
                    layout={layout || 'fill'}
                />
            </div>
            {mediaData && (
                <ComFigcaption>
                    {caption && (
                        <ComText
                            extraClass="--caption --twoxs"
                            text={caption}
                        />
                    )}
                    {credito && (
                        <ComText extraClass="--credit --twoxs" text={credito} />
                    )}
                </ComFigcaption>
            )}
            {/* <figcaption className="mod-figcaption">
                <span className="com-text --caption">{caption}</span>
                <span className="com-text --credit">{credito}</span>
            </figcaption> */}
        </figure>
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
    sourcesZoom: PropTypes.arrayOf(
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    layout: PropTypes.string,
    active: PropTypes.bool.isRequired
};

AmpImage.defaultProps = {
    layout: undefined
};

export default AmpImage;
