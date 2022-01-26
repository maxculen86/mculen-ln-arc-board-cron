import React from 'react';
import PropTypes from 'prop-types';
import ComImage from '../../../../common/com-image';
import ComPicture from '../../../../common/com-picture';
import { getSourceSet } from '../../utils/mediaHelper';

const ImageArticle = props => {
    const {
        image,
        href,
        outputType,
        active,
        withLazy,
        isVertical,
        isApertura
    } = props;

    const { alt_text: altText, caption, titleText, height, width, url } = image;
    const altBasic = altText || caption || titleText || '';
    if (!url) return null;

    const sources =
        image.resized_urls && image.resized_urls.filter(v => !!v.option);

    const sourcesZoom =
        image.resized_urls_zoom &&
        image.resized_urls_zoom.filter(v => !!v.option);

    const sourceActive = active ? sourcesZoom : sources;

    // TODO: ver este tema de source sets con maquetacion
    const srcsetAMP = getSourceSet(isVertical, image, sourceActive);

    return (
        <ComPicture href={href} amp={outputType === 'amp'}>
            {!active &&
                outputType !== 'amp' &&
                sources &&
                sources.map(x => {
                    return (
                        <source
                            key={x.option.media}
                            media={x.option.media}
                            srcSet={x.resizedUrl}
                        />
                    );
                })}
            {active &&
                sourcesZoom &&
                sourcesZoom.map(x => {
                    return (
                        <source
                            key={x.option.media}
                            media={x.option.media}
                            srcSet={x.resizedUrl}
                        />
                    );
                })}
            <ComImage
                srcsetAMP={srcsetAMP}
                src={url}
                alt={altBasic}
                amp={outputType === 'amp'}
                height={height}
                width={width}
                withLazy={withLazy}
                isApertura={isApertura}
            />
        </ComPicture>
    );
};

ImageArticle.propTypes = {
    outputType: PropTypes.string.isRequired,
    image: PropTypes.shape({
        type: PropTypes.oneOf(['image']),
        url: PropTypes.string,
        resized_urls: PropTypes.array.isRequired,
        resized_urls_zoom: PropTypes.array,
        width: PropTypes.number,
        height: PropTypes.number,
        alt_text: PropTypes.string,
        caption: PropTypes.string,
        titleText: PropTypes.string
    }).isRequired,
    active: PropTypes.bool,
    isVertical: PropTypes.bool,
    href: PropTypes.string,
    withLazy: PropTypes.bool,
    isApertura: PropTypes.bool
};

ImageArticle.defaultProps = {
    href: '',
    withLazy: true,
    active: false,
    isVertical: false,
    isApertura: false
};

export default ImageArticle;
