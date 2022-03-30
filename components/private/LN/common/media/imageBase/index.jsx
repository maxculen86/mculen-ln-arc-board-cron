import React from 'react';
import PropTypes from 'prop-types';
import ComImage from '../../../../common/com-image';
import ComPicture from '../../../../common/com-picture';
import {
    getSourceSet,
    getSizes,
    getShortestImage
} from '../../utils/mediaHelper';

const ImageArticle = props => {
    const { image, href, outputType, active, isVertical, isApertura } = props;

    const { alt_text: altText, caption, titleText, height, width, url } = image;

    const isAmp = outputType === 'amp';

    const altBasic = altText || caption || titleText || '';
    if (!url) return null;

    const sources =
        image.resized_urls && image.resized_urls.filter(v => !!v.option);

    const sourcesZoom =
        image.resized_urls_zoom &&
        image.resized_urls_zoom.filter(v => !!v.option);

    const sourceActive = active ? sourcesZoom : sources;

    // TODO: ver este tema de source sets con maquetacion

    const srcset = getSourceSet(isVertical, image, sourceActive);
    const sizes = getSizes(sourceActive);
    const { resizedUrl, _width } = getShortestImage(sourceActive);

    return (
        <ComPicture href={href} amp={outputType === 'amp'}>
            <ComImage
                srcset={srcset}
                sizes={sizes.length > 0 ? `${sizes},100vw` : '100vw'}
                src={`${resizedUrl} ${_width}w`}
                alt={altBasic}
                amp={isAmp}
                height={height}
                width={width}
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
    isApertura: PropTypes.bool
};

ImageArticle.defaultProps = {
    href: '',
    active: false,
    isVertical: false,
    isApertura: false
};

export default ImageArticle;
