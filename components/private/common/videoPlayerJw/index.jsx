// TODO ELIMINAR UNA VEZ SE CAMBIEN A VIDEOPLAYER NUEVO
import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { cx } from '@ln/cva';
import { Facade } from './utils/facade';
import VideoPlayerSnippet from '../scriptManager/snippetVideo';
import get from '../utils/get';
import {
    extractVideoData,
    calculateDisplayVariant,
    buildPlaylistConfig,
    buildVideoConfig,
    shouldShowFigureCaption as shouldShowCaption,
    getCaptionBgClass,
    getConfigClassName
} from '../../../features/LN/common/video/utils/videoDataUtils';
import urlForPrerollAds from '../../LN/common/utils/urlForPrerollAds';
import getSourcesJw from '../../LN/common/utils/getSourcesJw';
import FigureCaption from '../../../features/LN-10-global/common/figCaption/default';
import {
    STORYTELLING,
    VIDEO,
    LIVEBLOG_EDITORIAL,
    VIDEOAL100,
    VIDEO_VERTICAL,
    VIDEO_COMENTARIOS
} from '../utils/subtypes/subtypeHelper';
import config from '../../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

const SUBTYPES_WITHOUT_CAPTION = [
    STORYTELLING,
    VIDEO,
    LIVEBLOG_EDITORIAL,
    VIDEOAL100,
    VIDEO_VERTICAL,
    VIDEO_COMENTARIOS
];

const videoPlayerJW = ({
    data,
    parrafo,
    tituloNota,
    hasAutoplay,
    mediaContainerClassesProps,
    videoContainerClassesProps,
    isOpening
}) => {
    const videoData = extractVideoData(data);
    const {
        playerId,
        title,
        description,
        playlist,
        epigraphTitle,
        mediaId,
        sources,
        firstVideo
    } = videoData;

    const { arcSite, deployment, contextPath, globalContent, layout } =
        useAppContext();
    const subtype = get(globalContent, 'subtype', '');
    const promoItems = get(globalContent, 'promo_items', {});
    const isPromoItemVideo =
        get(promoItems, 'video_jw.embed.config.idVideo', '') === mediaId;

    const bgClass = getCaptionBgClass(subtype);

    const shouldShowFigureCaption = shouldShowCaption({
        isPromoItemVideo,
        subtype,
        subtypesWithoutCaption: SUBTYPES_WITHOUT_CAPTION
    });

    const variant = calculateDisplayVariant({
        isOpening,
        subtype,
        playerId
    });

    const {
        container,
        mediaContainer,
        videoContainer,
        videoPlayer,
        facade,
        facadeContainer,
        captionClasses
    } = getConfigClassName(variant, layout === layoutsName.Video, isOpening);

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

    const captionFigureClasses = cx(captionClasses, bgClass);
    const tagsUrl = urlForPrerollAds();

    const playlistForConfig = buildPlaylistConfig(playlist, mediaId, sources);

    const videoConfig = buildVideoConfig({
        title,
        mediaId,
        playerId,
        playlist: playlistForConfig,
        hasAutoplay,
        tagsUrl,
        arcSite
    });

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
                                <Facade
                                    id={mediaId}
                                    playlist={playlist}
                                    className={facade}
                                    containerClasses={facadeContainer}
                                    title={title}
                                    subtype={subtype}
                                    openingVideo={
                                        subtype === VIDEO || isPromoItemVideo
                                    }
                                />
                                <div id={mediaId} />
                            </div>
                            {shouldShowFigureCaption && (
                                <FigureCaption
                                    epigraphTitle={epigraphTitle}
                                    className={captionFigureClasses}
                                />
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
};

videoPlayerJW.arcType = 'video_jw';

export default videoPlayerJW;
