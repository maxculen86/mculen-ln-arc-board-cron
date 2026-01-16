import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { cx } from '@ln/cva';
import VideoFacade from './component/VideoFacade';
import {
    extractVideoData,
    calculateDisplayVariant,
    buildPlaylistConfig,
    buildVideoConfig,
    shouldShowFigureCaption,
    getConfigClassName
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
    VIDEO_VERTICAL
} from '../../../../private/common/utils/subtypes/subtypeHelper';
import config from '../../../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

const SUBTYPES_WITHOUT_CAPTION = [
    STORYTELLING,
    VIDEO,
    LIVEBLOG_EDITORIAL,
    VIDEOAL100,
    VIDEO_VERTICAL
];

function VideoPlayer({
    data,
    parrafo,
    tituloNota,
    hasAutoplay = false,
    mediaContainerClassesProps = '',
    videoContainerClassesProps = '',
    isOpening = false
}) {
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
    const { arcSite, deployment, contextPath, globalContent, layout } =
        useAppContext();
    const subtype = get(globalContent, 'subtype', '');
    const promoItems = get(globalContent, 'promo_items', {});
    const isPromoItemVideo =
        get(promoItems, 'video_jw.embed.config.idVideo', '') === mediaId;
    const variant = calculateDisplayVariant({
        isOpening,
        subtype,
        playerId
    });

    const isNotaVideo = layout === layoutsName.Video;
    const {
        container,
        mediaContainer,
        videoContainer,
        videoPlayer,
        facade,
        facadeContainer
    } = getConfigClassName(variant, isNotaVideo, isOpening);
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

    const videoContainerClassName = cx(
        videoContainer,
        videoContainerClassesProps
    );
    const mediaContainerClassName = cx(
        mediaContainer,
        mediaContainerClassesProps
    );
    const isOpeningVideo = subtype === VIDEO || isPromoItemVideo;

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
                <div className={container}>
                    <section className={mediaContainerClassName}>
                        <figure className={videoContainerClassName}>
                            <div
                                className={videoPlayer}
                                data-has-jwplayer="true"
                                data-video-id-jw={mediaId}
                                data-config={JSON.stringify(videoConfig)}
                            >
                                <VideoFacade
                                    mediaId={mediaId}
                                    images={images}
                                    fallbackSrc={fallbackImage}
                                    alt={title}
                                    className={facade}
                                    containerClassName={facadeContainer}
                                    loading={isOpeningVideo ? 'eager' : 'lazy'}
                                    fetchPriority={
                                        isOpeningVideo ? 'high' : 'low'
                                    }
                                    subtype={subtype}
                                />
                                <div id={mediaId} />
                            </div>
                            {showCaption && ( // TODO APLICAR NUEVOS ESTILOS
                                <figcaption>
                                    <span>{epigraphTitle}</span>
                                </figcaption>
                            )}
                        </figure>
                        <VideoPlayerSnippet
                            paragraph={parrafo || description}
                            noteTitle={tituloNota}
                            mediaData={firstVideo}
                            minStream={{ url: get(minStream, 'file', '') }}
                        />
                    </section>
                </div>
            </Static>
        </>
    );
}

VideoPlayer.arcType = 'video_jw';

export default VideoPlayer;
