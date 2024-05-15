import React from 'react';
import PropTypes from 'prop-types';

import { Image } from '@ln/foodit-ui-image';
import { getTypeOfDevice } from '@ln/hooks';
import get from '../../../../private/common/utils/get';

import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

import getAperturaStorytelling from '../../../../private/common/utils/getAperturaStorytelling';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import VideoSource from '../../../private-global/common/videoSource/foodit';
import replaceBaseUrl from '../utils/replaceBaseUrl';

export const OpeningStorytelling = ({ article = {} }) => {
    const { promo_items = {} } = article;

    const device = getTypeOfDevice({
        breakpoints: {
            mobile: 768,
            tablet: 1024
        }
    });

    const basicImage = replaceBaseUrl(get(promo_items, 'basic', null));
    const basicImageMobile = replaceBaseUrl(
        get(promo_items, 'storytelling_mobile')
    );
    const videoJw = get(promo_items, 'video_jw', null);

    const {
        videoUrl,
        defaultUrl,
        posterUrl,
        resizedUrls,
        altText,
        caption
    } = getAperturaStorytelling(videoJw, basicImage, basicImageMobile, device);

    if (videoUrl && isSSR()) return <></>;

    return videoUrl && device === 'desktop' ? (
        <VideoSource
            video={videoUrl}
            image={posterUrl}
            autoplay
            loop
            className="w-100 h-100 object-cover"
        />
    ) : (
        <Image
            className="w-100 h-100"
            alt={altText || caption}
            src={defaultUrl}
            fetchPriority="high"
            loading="eager"
            sources={getImagesToLoadWithPicture(resizedUrls)}
        />
    );
};

OpeningStorytelling.propTypes = {
    article: PropTypes.object
};

export default OpeningStorytelling;
