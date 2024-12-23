import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import PropTypes from 'prop-types';
import ComImage from '../../../../common/com-image';
import ComPicture from '../../../../common/com-picture';
import {
    getSourceSet,
    getSizes,
    getShortestImage,
    getImagesToLoadWithPicture
} from '../../utils/mediaHelper';
import replaceUrlResizerToWWW from '../../../../../../content/sources/utils/replaceUrlResizerToWWW';

function ImageArticle(props) {
    const {
        image,
        href,
        active,
        isVertical,
        isApertura,
        isValidSection,
        searchableField,
        authors
    } = props;
    const wwwImage = isApertura ? replaceUrlResizerToWWW(image) : image;
    const {
        alt_text: altText,
        caption,
        titleText,
        height,
        width,
        url
    } = wwwImage;

    const altBasic = altText || caption || titleText || '';
    if (!url) return null;

    const sources =
        wwwImage.resized_urls && wwwImage.resized_urls.filter(v => !!v.option);

    const sourcesZoom =
        wwwImage.resized_urls_zoom &&
        wwwImage.resized_urls_zoom.filter(v => !!v.option);

    const sourceActive = active ? sourcesZoom : sources;

    const srcset = getSourceSet(isVertical, wwwImage, sourceActive);
    const sizes = getSizes(sourceActive);
    const { resizedUrl } = getShortestImage(sourceActive);

    return (
        <ComPicture href={href}>
            {isValidSection ? (
                <div className="com-image">
                    <Adaptableimage
                        width={width}
                        alt={altBasic}
                        height={height}
                        src={resizedUrl || url}
                        className="com-image"
                        searchableField={searchableField}
                        fetchPriority={isApertura ? 'high' : 'low'}
                        loading={isApertura ? 'eager' : 'lazy'}
                        sources={getImagesToLoadWithPicture(sourceActive)}
                    />
                </div>
            ) : (
                <ComImage
                    srcset={srcset}
                    sizes={sizes.length > 0 ? `${sizes},100vw` : '100vw'}
                    src={resizedUrl || url}
                    alt={authors || altBasic}
                    height={height}
                    width={width}
                    isApertura={isApertura}
                    searchableField={searchableField}
                />
            )}
        </ComPicture>
    );
}

ImageArticle.propTypes = {
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
    isApertura: PropTypes.bool,
    isValidSection: PropTypes.bool,
    authors: PropTypes.string
};

ImageArticle.defaultProps = {
    href: '',
    active: false,
    isVertical: false,
    isApertura: false,
    isValidSection: false
};

export default ImageArticle;
