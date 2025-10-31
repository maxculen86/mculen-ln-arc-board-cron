import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { cx } from '@ln/cva';
import { Facade } from './utils/facade';
import VideoPlayerSnippet from '../scriptManager/snippetVideo';
import get from '../utils/get';
import {
    configClassName,
    getCaptionBgClass,
    getVerticalPlayer
} from './utils/helperJw';
import urlForPrerollAds from '../../LN/common/utils/urlForPrerollAds';
import getSourcesJw from '../../LN/common/utils/getSourcesJw';
import FigureCaption from '../../../features/LN-10-global/common/figCaption/default';
import {
    STORYTELLING,
    VIDEO,
    LIVEBLOG_EDITORIAL,
    VIDEOAL100
} from '../utils/subtypes/subtypeHelper';

const videoPlayerJW = ({
    data,
    parrafo,
    tituloNota,
    hasAutoplay,
    mediaContainerClassesProps,
    videoContainerClassesProps
}) => {
    const {
        embed: {
            config: {
                idPlayer,
                videoJw: {
                    title = '',
                    description = '',
                    playlist = [],
                    epigraphTitle = ''
                } = {}
            } = {}
        } = {}
    } = data;

    const player = idPlayer || 'ih0086X3';
    const [video] = playlist || [];
    const { mediaid = '', sources = [] } = video || {};
    const { arcSite, deployment, contextPath, globalContent } = useAppContext();
    const subtype = get(globalContent, 'subtype', '');
    const promoItems = get(globalContent, 'promo_items', {});
    const isPromoItemVideo =
        get(promoItems, 'video_jw.embed.config.idVideo', '') === mediaid;
    const isSubtypeWithoutFigureCaption = [
        STORYTELLING,
        VIDEO,
        LIVEBLOG_EDITORIAL,
        VIDEOAL100
    ].includes(subtype);

    const bgClass = getCaptionBgClass(subtype);

    const shouldShowFigureCaption =
        !isPromoItemVideo || !isSubtypeWithoutFigureCaption;

    const videoOrientation = getVerticalPlayer(idPlayer)
        ? 'vertical'
        : 'horizontal';

    const {
        container,
        mediaContainer,
        videoContainer,
        videoPlayer,
        facade,
        facadeContainer,
        captionClasses
    } = get(configClassName, `${arcSite}.${videoOrientation}`, {});

    const minStream = video && getSourcesJw(get(video, 'sources', []));

    const videoContainerClassName = cx(
        videoContainer,
        videoContainerClassesProps
    );

    const mediaContainerClassName = cx(
        mediaContainer,
        mediaContainerClassesProps
    );

    const captionFigureClasses = cx(captionClasses, bgClass);

    return (
        <Static id={mediaid}>
            <div className={container}>
                <section className={mediaContainerClassName}>
                    <figure className={videoContainerClassName}>
                        <div className={videoPlayer}>
                            <Facade
                                id={mediaid}
                                playlist={playlist}
                                className={facade}
                                containerClasses={facadeContainer}
                                title={title}
                                subtype={subtype}
                                openingVideo={
                                    subtype === VIDEO || isPromoItemVideo
                                }
                            />
                            <div id={mediaid} />
                            <script
                                defer
                                className="video-jw"
                                id="scriptVideosJw"
                                data-title={title}
                                data-player={player}
                                data-playlist={JSON.stringify([
                                    { mediaid, sources }
                                ])}
                                data-has-autoplay={hasAutoplay}
                                data-media-id={mediaid}
                                data-tags-url={urlForPrerollAds()}
                                data-autostart
                                src={deployment(
                                    `${contextPath}/resources/js/LN/scriptVideosJw.min.js`
                                )}
                            />
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
                        mediaData={video}
                        minStream={{ url: get(minStream, 'file', '') }}
                    />
                </section>
            </div>
        </Static>
    );
};

videoPlayerJW.arcType = 'video_jw';

export default videoPlayerJW;
