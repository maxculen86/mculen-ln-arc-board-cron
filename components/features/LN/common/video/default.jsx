import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { cx } from '@ln/ds-cva';
import VideoFacade from './component/VideoFacade';
import {
    extractVideoData,
    buildPlaylistConfig,
    buildVideoConfig,
    shouldShowFigureCaption,
    getVideoOrientation
} from './utils/videoDataUtils';

import urlForPrerollAds from '../../../../private/LN/common/utils/urlForPrerollAds';
import getSourcesJw from '../../../../private/LN/common/utils/getSourcesJw';
import get from '../../../../private/common/utils/get';
import VideoPlayerSnippet from '../../../../private/common/scriptManager/snippetVideo';
import {
    STORYTELLING,
    VIDEO,
    LIVEBLOG_EDITORIAL,
    VIDEOAL100,
    VIDEO_VERTICAL,
    OPINION
} from '../../../../private/common/utils/subtypes/subtypeHelper';
import { WrapperBody } from '../wrapperBody/default';

const SUBTYPES_WITHOUT_CAPTION = [
    STORYTELLING,
    VIDEO,
    LIVEBLOG_EDITORIAL,
    VIDEOAL100,
    VIDEO_VERTICAL,
    OPINION
];

function VideoPlayer({ data, hasAutoplay = false }) {
    const videoData = extractVideoData(data);
    const {
        playerId,
        title,
        description,
        playlist,
        epigraphTitle,
        mediaId,
        sources,
        images,
        fallbackImage,
        firstVideo
    } = videoData;
    const { arcSite, deployment, contextPath, globalContent } = useAppContext();
    const subtype = get(globalContent, 'subtype', '');
    const promoItems = get(globalContent, 'promo_items', {});
    const isPromoItemVideo =
        get(promoItems, 'video_jw.embed.config.idVideo', '') === mediaId;

    const tagsUrl = urlForPrerollAds();
    const playlistConfig = buildPlaylistConfig(playlist, mediaId, sources);
    const videoConfig = buildVideoConfig({
        title,
        mediaId,
        playerId,
        playlist: playlistConfig,
        hasAutoplay,
        tagsUrl,
        arcSite
    });
    const showCaption = shouldShowFigureCaption({
        isPromoItemVideo,
        subtype,
        subtypesWithoutCaption: SUBTYPES_WITHOUT_CAPTION
    });

    const minStream =
        firstVideo && getSourcesJw(get(firstVideo, 'sources', []));

    const isOpeningVideo = subtype === VIDEO || isPromoItemVideo;
    const orientation = getVideoOrientation(playerId);

    const containerClass = cx(
        'border-1 border-neutral-200 w-full box-content',
        !isOpeningVideo && orientation === 'vertical'
            ? 'aspect-9/16 max-w-480'
            : 'aspect-16/9',
        {
            'max-md:border-x-0 -mx-16 md:mx-0 w-[calc(100%+2rem)] md:w-full max-md:max-w-none':
                isOpeningVideo
        }
    );

    return (
        <WrapperBody
            variant={isOpeningVideo ? null : 'medium'}
            className="mb-48"
        >
            <Static id="scriptJwVideoNote">
                <script
                    defer
                    src={deployment(
                        `${contextPath}/resources/js/LN/scriptJwVideoNote.min.js`
                    )}
                />
            </Static>
            <Static id={mediaId}>
                <div className="w-full flex justify-center bg-neutral-50">
                    <div
                        data-has-jwplayer="true"
                        data-video-id-jw={mediaId}
                        data-config={JSON.stringify(videoConfig)}
                        className={containerClass}
                    >
                        <VideoFacade
                            mediaId={mediaId}
                            images={images}
                            fallbackSrc={fallbackImage}
                            alt={title}
                            loading={isOpeningVideo ? 'eager' : 'lazy'}
                            fetchPriority={isOpeningVideo ? 'high' : 'low'}
                            subtype={subtype}
                        />
                        <div id={mediaId} />
                    </div>
                </div>
                {showCaption && (
                    <figcaption className="py-8">
                        <span className="font-normal text-base-default text-16 text-center leading-[110%] tracking-[-0.3px]">
                            {epigraphTitle}
                        </span>
                    </figcaption>
                )}
                <VideoPlayerSnippet
                    paragraph={description}
                    mediaData={firstVideo}
                    minStream={{ url: get(minStream, 'file', '') }}
                />
            </Static>
        </WrapperBody>
    );
}

VideoPlayer.arcType = 'video_jw';

export default VideoPlayer;
