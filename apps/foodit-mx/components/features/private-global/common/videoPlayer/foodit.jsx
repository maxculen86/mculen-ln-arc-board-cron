import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import Facade from '../facade/foodit';

function VideoPlayer({
    data = {},
    tituloNota = '',
    className = '',
    isOpening = false
}) {
    const { deployment, contextPath, arcSite } = useAppContext();

    const {
        embed: {
            config: {
                idPlayer,
                videoJw: { title = '', playlist = [] } = {}
            } = {}
        } = {}
    } = data;

    const player = idPlayer || 'ih0086X3';
    const [video] = playlist || [];
    const { mediaid = '', image = '', images = [] } = video || {};

    return (
        <Static id={mediaid}>
            <section className={`video-player bg-black ${className}`}>
                <Facade
                    id={mediaid}
                    image={image}
                    resizedUrls={images}
                    altText={tituloNota}
                    isOpening={isOpening}
                />
                <div className="jw-player w-100 h-100 none" id={mediaid} />
                <script
                    defer
                    className="video-jw"
                    id="scriptVideosJw"
                    data-title={title}
                    data-player={player}
                    data-playlist={JSON.stringify(playlist)}
                    data-has-autoplay={isOpening}
                    data-media-id={mediaid}
                    data-tags-url=""
                    data-autostart={false}
                    data-arc-site={arcSite}
                    src={deployment(
                        `${contextPath}/resources/js/LN/scriptVideosJw.min.js`
                    )}
                />
            </section>
        </Static>
    );
}
export default VideoPlayer;
