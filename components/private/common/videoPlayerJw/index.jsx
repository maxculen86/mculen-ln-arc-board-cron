import React from 'react';
import { Facade } from './utils/facade';
import { useAppContext } from 'fusion:context';
import VideoPlayerSnippet from '../scriptManager/snippetVideo';
import get from '../utils/get';
import { getJWScript, configClassName } from './utils/helperJw';
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
    const { outputType, arcSite } = useAppContext();

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
        <div className={container}>
            <section className={mediaContainer}>
                <div className={videoContainer}>
                    {outputType !== 'amp' ? (
                        <div className={videoPlayer}>
                            <Facade
                                id={mediaid}
                                playlist={playlist}
                                className={facade}
                                title={title}
                            />
                            <div id={mediaid} />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: getJWScript(
                                        title,
                                        player,
                                        playlist,
                                        hasAutoplay,
                                        mediaid,
                                        tagsUrl
                                    )
                                }}
                            />
                        </div>
                    ) : (
                        <amp-jwplayer
                            data-media-id={mediaid}
                            data-player-id={'ih0086X3'}
                            data-tag={tagsUrl}
                            layout="responsive"
                            width="16"
                            height="9"
                        ></amp-jwplayer>
                    )}
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
    );
};

videoPlayerJW.arcType = 'video_jw';

export default videoPlayerJW;
