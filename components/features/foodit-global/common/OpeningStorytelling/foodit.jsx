import React from 'react';

import { Image } from '@ln/foodit-ui-image';
import { getTypeOfDevice } from '@ln/hooks';
import get from '../../../../private/common/utils/get';

import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

import getAperturaStorytelling from '../../../../private/common/utils/getAperturaStorytelling';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import VideoSource from '../../../private-global/common/videoSource/foodit';
import replaceBaseUrl from '../utils/replaceBaseUrl';

export function OpeningStorytelling({ article = {}, isPrivate = false }) {
    const { promo_items: promoItems = {}, headlines = {} } = article;

    const device = getTypeOfDevice({
        breakpoints: {
            mobile: 768,
            tablet: 1024
        }
    });

    const title = get(headlines, 'basic', '');
    const basicImage = replaceBaseUrl(get(promoItems, 'basic', null));
    const basicImageMobile = replaceBaseUrl(
        get(promoItems, 'storytelling_mobile')
    );
    const videoJw = get(promoItems, 'video_jw', null);

    const emptyFragment = null;
    const { videoUrl, defaultUrl, posterUrl, resizedUrls, altText } =
        getAperturaStorytelling(
            videoJw,
            basicImage,
            basicImageMobile,
            device,
            title
        );

    if (videoUrl && isSSR()) return emptyFragment;

    return videoUrl && device === 'desktop' && !isPrivate ? (
        <VideoSource
            video={videoUrl}
            image={posterUrl}
            autoplay
            loop
            className="w-100 h-100 object-cover"
        />
    ) : (
        <Image
            className="w-100 ratio-unset_lg ratio-3-2"
            placeholderClassName="h-100"
            alt={altText}
            src={defaultUrl}
            fetchPriority="high"
            loading="eager"
            sources={getImagesToLoadWithPicture(false, resizedUrls)}
        />
    );
}

export default OpeningStorytelling;
