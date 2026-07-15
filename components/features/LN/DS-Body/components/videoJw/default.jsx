import React from 'react';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/ds-cva';
import useVideoJwBody from '../../../common/video/utils/useVideoJwBody';
import VideoPlayer from '../../../common/video/default';
import { WrapperBody } from '../../../common/wrapperBody/default';
import get from '../../../../../private/common/utils/get';
import {
    getVideoOrientation,
    shouldShowFigureCaption
} from '../../../common/video/utils/videoDataUtils';
import {
    VIDEO,
    STORYTELLING,
    LIVEBLOG_EDITORIAL,
    VIDEOAL100,
    VIDEO_VERTICAL,
    OPINION
} from '../../../../../private/common/utils/subtypes/subtypeHelper';

const SUBTYPES_WITHOUT_CAPTION = [
    STORYTELLING,
    VIDEO,
    LIVEBLOG_EDITORIAL,
    VIDEOAL100,
    VIDEO_VERTICAL,
    OPINION
];

function VideoJw({ data, hasAutoplay = false }) {
    const { videoData, playerId, mediaId } = useVideoJwBody(data);

    const { globalContent } = useAppContext();
    const subtype = get(globalContent, 'subtype', '');
    const promoItems = get(globalContent, 'promo_items', {});
    const isPromoItemVideo =
        get(promoItems, 'video_jw.embed.config.idVideo', '') === mediaId;
    const isOpeningVideo = subtype === VIDEO || isPromoItemVideo;
    const orientation = getVideoOrientation(playerId);
    const showCaption = shouldShowFigureCaption({
        isPromoItemVideo,
        subtype,
        subtypesWithoutCaption: SUBTYPES_WITHOUT_CAPTION
    });
    const containerClass = cx(
        'border-1 border-neutral-200 w-full box-content',
        !isOpeningVideo && orientation === 'vertical'
            ? 'aspect-9/16'
            : 'aspect-16/9',
        {
            'max-md:border-x-0 -mx-16 md:mx-0 w-[calc(100%+2rem)] md:w-full max-md:max-w-none':
                isOpeningVideo
        }
    );
    return (
        <WrapperBody
            variant={isOpeningVideo ? null : 'narrow'}
            className="mb-48"
        >
            <VideoPlayer
                videoData={videoData}
                className={containerClass}
                loadingType={isOpeningVideo ? 'eager' : 'lazy'}
                fetchPriority={isOpeningVideo ? 'high' : 'low'}
                subtype={subtype}
                showCaption={showCaption}
                hasAutoplay={hasAutoplay}
            />
        </WrapperBody>
    );
}

VideoJw.arcType = 'video_jw';

export default VideoJw;
