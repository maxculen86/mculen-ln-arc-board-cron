import React from 'react';
import { Facade } from './utils/facade';
import { useAppContext } from 'fusion:context';
import VideoPlayerSnippet from '../scriptManager/snippetVideo';
import get from '../utils/get';
import { getJWScript } from './utils/helperJw';
import urlForPrerollAds from '../../LN/common/utils/urlForPrerollAds';
import useViewportSize from '../hooks/useViewportSize';

const videoPlayerJW = ({ data, parrafo, tituloNota, hasAutoplay }) => {
    const {
        embed: {
            config: {
                idPlayer,
                videoJw: { title = '', description = '', playlist = [] } = {}
            } = {}
        } = {}
    } = data;
    const player = idPlayer || 'ih0086X3';
    const [video] = playlist || [];
    const { mediaid = '' } = video || {};
    const { outputType } = useAppContext();

    const device = useViewportSize();

    const tagsUrl = urlForPrerollAds(device, true);

    return (
        <div className="content-media">
            <section className="mod-media">
                <div className="mod-video">
                    {outputType !== 'amp' ? (
                        <div className="video-player --background --ar-16-9">
                            <Facade title={title} playlist={playlist} />
                            <div id={title} />
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
                <VideoPlayerSnippet
                    parrafo={parrafo || description}
                    tituloNota={tituloNota}
                    mediaData={video}
                    minStream={{ url: get(video, 'link', '') }}
                />
            </section>
        </div>
    );
};

videoPlayerJW.arcType = 'video_jw';

export default videoPlayerJW;
