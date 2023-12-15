import React from 'react';
import Facade from '../facade/foodit';
import { getJWScript } from './utils/helperJw';

const VideoPlayer = ({ data = {}, tituloNota = '', className = '' }) => {
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
        <section className={className}>
            <Facade
                id={mediaid}
                image={image}
                resizedUrls={images}
                altText={tituloNota}
            />
            <div id={mediaid} />
            <script
                dangerouslySetInnerHTML={{
                    __html: getJWScript({
                        title,
                        player,
                        playlist,
                        hasAutoplay: false,
                        idVideo: mediaid,
                        tagsUrl: ''
                    })
                }}
            />
        </section>
    );
};

export default VideoPlayer;
