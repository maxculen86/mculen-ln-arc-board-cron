import React from 'react';
import { Facade } from './utils/facade';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import VideoPlayerSnippet from '../scriptManager/snippetVideo';
import get from '../utils/get';
import { configClassName } from './utils/helperJw';
import urlForPrerollAds from '../../LN/common/utils/urlForPrerollAds';
import useViewportSize from '../hooks/useViewportSize';

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
                videoJw: { title = '', description = '', playlist = [] } = {}
            } = {}
        } = {}
    } = data;
    const player = isOtt ? '81YXy6Mt' : idPlayer || 'ih0086X3';
    const [video] = playlist || [];
    const { mediaid = '' } = video || {};
    const { arcSite, deployment, contextPath } = useAppContext();

    const {
        container,
        mediaContainer,
        videoContainer,
        videoPlayer,
        facade
    } = get(configClassName, arcSite, {});

    const device = useViewportSize();

    const tagsUrl = urlForPrerollAds(device, true);

    return (
        <Static id={mediaid}>
            <div className={container}>
                <section className={mediaContainer}>
                    <div className={videoContainer}>
                        <div className={videoPlayer}>
                            <Facade
                                id={mediaid}
                                playlist={playlist}
                                className={facade}
                                title={title}
                            />
                            <div id={mediaid} />
                            <script
                                defer
                                className="video-jw"
                                id="scriptVideosJw"
                                data-title={title}
                                data-player={player}
                                data-playlist={JSON.stringify(playlist)}
                                data-has-autoplay={hasAutoplay}
                                data-media-id={mediaid}
                                data-tags-url={tagsUrl}
                                data-autostart
                                src={deployment(
                                    `${contextPath}/resources/js/LN/scriptVideosJw.min.js`
                                )}
                            />
                        </div>
                    </div>
                    {!isOtt && (
                        <VideoPlayerSnippet
                            parrafo={parrafo || description}
                            tituloNota={tituloNota}
                            mediaData={video}
                            minStream={{ url: get(video, 'link', '') }}
                        />
                    )}
                </section>
            </div>
        </Static>
    );
};

videoPlayerJW.arcType = 'video_jw';

export default videoPlayerJW;
