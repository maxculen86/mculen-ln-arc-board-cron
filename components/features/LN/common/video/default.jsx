import React from 'react';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import VideoFacade from './component/VideoFacade';

import get from '../../../../private/common/utils/get';
import VideoPlayerSnippet from '../../../../private/common/scriptManager/snippetVideo';
import urlForPrerollAds from '../../../../private/LN/common/utils/urlForPrerollAds';
import getSourcesJw from '../../../../private/LN/common/utils/getSourcesJw';
import { buildVideoConfig, buildPlaylistConfig } from './utils/videoDataUtils';

function VideoPlayer({
    videoData,
    className,
    loadingType = 'lazy',
    fetchPriority = 'low',
    subtype = '',
    showCaption = false,
    hasAutoplay = false
}) {
    const { arcSite, deployment, contextPath } = useAppContext();
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
        firstVideo,
        duration
    } = videoData || {};

    const tagsUrl = urlForPrerollAds();
    const playlistConfig = buildPlaylistConfig(playlist, mediaId, sources);
    const videoConfig = buildVideoConfig({
        title,
        mediaId,
        playerId,
        playlist: playlistConfig,
        hasAutoplay,
        tagsUrl,
        arcSite,
        duration
    });
    const minStream =
        firstVideo && getSourcesJw(get(firstVideo, 'sources', []));

    return (
        <>
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
                        className={className}
                    >
                        <VideoFacade
                            mediaId={mediaId}
                            images={images}
                            fallbackSrc={fallbackImage}
                            alt={title}
                            loading={loadingType}
                            fetchPriority={fetchPriority}
                            subtype={subtype}
                        />
                        <div id={mediaId} />
                    </div>
                </div>
                {showCaption && epigraphTitle && (
                    <figcaption className="py-8">
                        <span className="font-normal text-base-default text-16 text-center leading-[140%] tracking-[-0.3px]">
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
        </>
    );
}

export default VideoPlayer;
