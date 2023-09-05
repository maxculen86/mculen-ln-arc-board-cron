import React from 'react';
import { Facade } from './utils/facade';
import VideoPlayerSnippet from '../scriptManager/snippetVideo';
import get from '../utils/get';
import { getJWScript } from './utils/helperJw';

const videoPlayerJW = ({ data, parrafo, tituloNota, hasAutoplay }) => {
    const {
        embed: {
            config: {
                idPlayer,
                videoJw: { title, description, playlist } = {}
            } = {}
        } = {}
    } = data;
    const player = idPlayer || 'bWFcPBAT';
    const [video] = playlist || [];

    return (
        <div className="content-media">
            <section className="mod-media">
                <div className="mod-video">
                    <div className="video-player --background">
                        <Facade title={title} playlist={playlist} />
                        <div id={title} />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: getJWScript(
                                    title,
                                    player,
                                    playlist,
                                    hasAutoplay
                                )
                            }}
                        />
                        <VideoPlayerSnippet
                            parrafo={parrafo || description}
                            tituloNota={tituloNota}
                            mediaData={video}
                            minStream={{ url: get(video, 'link', '') }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

videoPlayerJW.arcType = 'video_jw';

export default videoPlayerJW;
