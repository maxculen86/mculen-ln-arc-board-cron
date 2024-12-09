import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { Facade } from './utils/facade';
import VideoPlayerSnippet from '../scriptManager/snippetVideo';
import get from '../utils/get';
import { configClassName } from './utils/helperJw';
import urlForPrerollAds from '../../LN/common/utils/urlForPrerollAds';
import getSourcesJw from '../../LN/common/utils/getSourcesJw';
import FigureCaption from '../../../features/LN-10-global/common/figCaption/default';
import { STORYTELLING, VIDEO } from '../utils/subtypes/subtypeHelper';

const videoPlayerJW = ({
    data,
    parrafo,
    tituloNota,
    hasAutoplay,
    isOtt = false
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

    const player = isOtt ? '81YXy6Mt' : idPlayer || 'ih0086X3';
    const [video] = playlist || [];
    const { mediaid = '' } = video || {};
    const { arcSite, deployment, contextPath, globalContent } = useAppContext();
    const subtype = get(globalContent, 'subtype', '');
    const promoItems = get(globalContent, 'promo_items', {});
    const isPromoItemVideo =
        get(promoItems, 'video_jw.embed.config.idVideo', '') === mediaid;
    const isStorytellingOrVideoSubtype =
        subtype === STORYTELLING || subtype === VIDEO;
    const shouldShowFigureCaption =
        !isPromoItemVideo || !isStorytellingOrVideoSubtype;

    const { container, mediaContainer, videoContainer, videoPlayer, facade } =
        get(configClassName, arcSite, {});

    const minStream = video && getSourcesJw(get(video, 'sources', []));

    return (
        <Static id={mediaid}>
            <div className={container}>
                <section className={mediaContainer}>
                    <div className={videoContainer}>
                        <figure className={videoPlayer}>
                            <Facade
                                id={mediaid}
                                playlist={playlist}
                                className={facade}
                                title={title}
                                subtype={subtype}
                            />
                            <div id={mediaid} />
                            {shouldShowFigureCaption && (
                                <FigureCaption epigraphTitle={epigraphTitle} />
                            )}
                            <script
                                defer
                                className="video-jw"
                                id="scriptVideosJw"
                                data-title={title}
                                data-player={player}
                                data-playlist={JSON.stringify(playlist)}
                                data-has-autoplay={hasAutoplay}
                                data-media-id={mediaid}
                                data-tags-url={urlForPrerollAds()}
                                data-autostart
                                src={deployment(
                                    `${contextPath}/resources/js/LN/scriptVideosJw.min.js`
                                )}
                            />
                        </figure>
                    </div>
                    {!isOtt && (
                        <VideoPlayerSnippet
                            paragraph={parrafo || description}
                            noteTitle={tituloNota}
                            mediaData={video}
                            minStream={{ url: get(minStream, 'file', '') }}
                        />
                    )}
                </section>
            </div>
        </Static>
    );
};

videoPlayerJW.arcType = 'video_jw';

export default videoPlayerJW;
