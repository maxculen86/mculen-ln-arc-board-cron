import React from 'react';
import replaceUrlResizerToWWW from '../../../content/sources/utils/replaceUrlResizerToWWW';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../private/LN/common/utils/mediaHelper';
import get from '../../private/common/utils/get';

import MediaImage from '../../features/LN-10-global/common/mediaImage/default';
import VideoPlayerJW from '../../private/common/videoPlayerJw';
import MediaIframe from '../LN-Nota-Liveblog_Editorial/components/apertura/MediaIframe';

export const getMediaData = (promoItems = {}) => {
    const {
        apertura_multimedia: aperturaMultimedia,
        basic,
        video_jw: videoJW
    } = promoItems;
    const mediaData = aperturaMultimedia || basic;
    const type = get(mediaData, 'type', '');

    if (type === 'video') {
        return {
            ...mediaData,
            promo_items: {
                basic: replaceUrlResizerToWWW(
                    get(mediaData, 'promo_items.basic', {})
                )
            }
        };
    }

    if (videoJW) {
        return videoJW;
    }

    return replaceUrlResizerToWWW(mediaData);
};

const getMediaType = (type, subtype) =>
    type === 'raw_html' ? 'iframe' : type || subtype;

const prepareImageData = mediaData => {
    const wwwImage = replaceUrlResizerToWWW(mediaData);
    const {
        alt_text: altText,
        caption: imageCaption,
        titleText,
        url
    } = wwwImage;

    const altBasic = altText || imageCaption || titleText || '';
    const sources = get(wwwImage, 'resized_urls', []).filter(
        image => !!image.option
    );
    const { resizedUrl } = getShortestImage(sources);
    const sourcesToLoad = getImagesToLoadWithPicture(false, sources);

    return { altBasic, resizedUrl, url, sourcesToLoad };
};

const renderImageComponent = mediaData => {
    const { altBasic, resizedUrl, url, sourcesToLoad } =
        prepareImageData(mediaData);

    return (
        <MediaImage
            alt={altBasic}
            src={resizedUrl || url}
            sources={sourcesToLoad}
        />
    );
};

const renderVideoComponent = (mediaData, classes, hasAutoplay, isOpening) => (
    <VideoPlayerJW
        data={mediaData}
        hasAutoplay={hasAutoplay}
        isOpening={isOpening}
        {...classes}
    />
);

const renderIframeComponent = mediaData => (
    <MediaIframe html={mediaData.content} className="iframe-wrapper" />
);

export const getMediaItem = ({
    mediaData,
    classes,
    hasAutoplay,
    isOpening
}) => {
    if (!mediaData) return null;

    const { type, subtype } = mediaData;
    const mediaType = getMediaType(type, subtype);

    const mediaRenderers = {
        image: () => renderImageComponent(mediaData),
        video_jw: () =>
            renderVideoComponent(mediaData, classes, hasAutoplay, isOpening),
        iframe: () => renderIframeComponent(mediaData)
    };

    const renderer = mediaRenderers[mediaType];
    return renderer ? renderer() : null;
};
