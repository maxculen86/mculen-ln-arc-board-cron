import React from 'react';
import PropTypes from 'prop-types';

import { getTypeOfDevice } from '@ln/hooks';
import getAuthorsAsString from '../../../../private/common/utils/getAuthorsAsString';
import get from '../../../../private/common/utils/get';

import { Text } from '@ln/common-ui-text';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

import ModVideo from '../../../../private/common/mod-video';
import getAperturaStorytelling from '../../../../private/common/utils/getAperturaStorytelling';
import isSSR from '../../../../private/LN/common/utils/isSSR';

export const OpeningStorytelling = ({ article = {} }) => {
    const { promo_items = {}, headlines = {} } = article;

    const title = get(headlines, 'basic', '');

    const device = getTypeOfDevice({
        breakpoints: {
            mobile: 768,
            tablet: 1024
        }
    });

    const author = getAuthorsAsString(article);
    const basicImage = get(promo_items, 'basic', null);
    const basicImageMobile = get(promo_items, 'storytelling_mobile');
    const videoJw = get(promo_items, 'video_jw', null);

    const {
        videoUrl,
        defaultUrl,
        posterUrl,
        resizedUrls,
        altText
    } = getAperturaStorytelling(videoJw, basicImage, basicImageMobile, device);

    if (videoUrl && isSSR()) return <></>;

    // TODO: Video className='w-100 h-100 ratio-unset_lg ratio-16-9'
    // TODO: Image className='w-100 h-100 ratio-unset_lg ratio-3-2'
    // TODO: {title} y {author} no van en este feature
    return videoUrl && device === 'desktop' ? (
        <>
            <ModVideo video={videoUrl} image={posterUrl} autoplay loop />
            <Text text={title} as="h1" />
            <br />
            <Text text={author} as="h3" />
        </>
    ) : (
        <>
            <div className="com-image">
                <Adaptableimage
                    alt={altText}
                    src={defaultUrl}
                    className="com-image"
                    fetchPriority="high"
                    loading="eager"
                    sources={getImagesToLoadWithPicture(resizedUrls)}
                />
            </div>
            <Text text={title} as="h1" />
            <br />
            <Text text={author} as="h3" />
        </>
    );
};

OpeningStorytelling.propTypes = {
    article: PropTypes.object
};

export default OpeningStorytelling;
