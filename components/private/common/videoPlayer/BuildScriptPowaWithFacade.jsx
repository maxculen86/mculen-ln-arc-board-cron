/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import deviceType from '../../LN/common/utils/deviceType';
import {
    buildScriptPowa,
    removeFacade,
    handleClickEvent,
    withAutoPlay,
    setIntersectionObserver,
    setCustomErrorsVideoPlayer,
    getClassForFacade,
    addToDataLayer,
    setEvent,
    setProgressEvent
} from '../utils/videoPlayerHelper';
import ImageArticle from '../../LN/common/media/imageBase';

export default function BuildScriptPowaWithFacade({
    firstVideoCuerpoAutoplay,
    isApertura,
    firstVideoId,
    tituloVideo,
    streamingAnalyticInstance,
    aperturaVideo,
    videoId,
    apiEnv,
    videoImageData,
    outputType,
    arcSite
}) {
    const { height, width } = videoImageData || {};
    const isVerticalVideo = height > width;

    return (
        <>
            <div
                className={`content-facade ${getClassForFacade(
                    arcSite,
                    isVerticalVideo
                )}`}
                id={videoId}
            >
                <div id="button-play" className="button-play" />
                <ImageArticle
                    image={videoImageData}
                    isApertura={isApertura}
                    outputType={outputType}
                />
            </div>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    ${deviceType}
                    ${buildScriptPowa}
                    ${setIntersectionObserver}
                    ${handleClickEvent}
                    ${withAutoPlay}
                    ${removeFacade}
                    ${setCustomErrorsVideoPlayer}
                    ${addToDataLayer}
                    ${setProgressEvent}
                    ${setEvent}

                    window.addEventListener('load', () => {
                        setCustomErrorsVideoPlayer()
                        const isDesktop = deviceType() === 'desktop'
                        const videoPlayerList = document.querySelectorAll('.video-player');

                        const setVideoEvents = event => {
                            console.log("🚀 ~ file: BuildScriptPowaWithFacade.jsx:105 ~ setVideoEvents ~ event:", event);
                            const player = event.detail.powa;
                            const playerID = event.detail.id;
                
                            if (playerID.includes('${videoId}')) {
                                setProgressEvent(player, '${tituloVideo}', '${videoId}');
                                setEvent(
                                    player,
                                    'play',
                                    'videoPlay',
                                    '${tituloVideo}',
                                    '${videoId}',
                                    ${streamingAnalyticInstance});
                                setEvent(
                                    player,
                                    'complete',
                                    'videoComplete',
                                    '${tituloVideo}',
                                    '${videoId}',
                                    ${streamingAnalyticInstance});
                            }
                
                            return null;
                        };
                        
                        const observer = setIntersectionObserver(
                            videoPlayerList,
                            '${apiEnv}',
                            isDesktop,
                            ${firstVideoCuerpoAutoplay},
                            '${firstVideoId}',
                            '${videoId}',
                            ${isApertura}
                        )
                        
                        window.addEventListener('powaReady', () => {
                            observer.disconnect();
                            removeFacade();

                            const [{ shadowRoot } = {}] = document.querySelectorAll('.powa-shadow');
                            let divFirstPowa =
                                shadowRoot.querySelector &&
                                shadowRoot.querySelector('[data-uuid="${firstVideoId}"]');

                            let userPause = false;

                            if (${!firstVideoCuerpoAutoplay} && ${!aperturaVideo}) {
                                divFirstPowa = undefined
                            }

                            if (divFirstPowa && window.powas) {
                                const { powa } = window.powas[divFirstPowa.id];
                                powa.on('pause', () => userPause = true);
                                powa.on('viewable', () => !userPause && powa.play());
                            }

                            addToDataLayer('videoDisplay', '${tituloVideo}', '${videoId}')

                            

                        });
                        window.addEventListener('powaReady', setVideoEvents);
                    });
                `
                }}
            />
        </>
    );
}

BuildScriptPowaWithFacade.propTypes = {
    videoId: PropTypes.string.isRequired,
    isApertura: PropTypes.bool,
    firstVideoCuerpoAutoplay: PropTypes.bool,
    firstVideoId: PropTypes.string,
    tituloVideo: PropTypes.string,
    aperturaVideo: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})])
        .isRequired,
    apiEnv: PropTypes.string.isRequired,
    videoImageData: PropTypes.shape({
        caption: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        url: PropTypes.string,
        resized_urls: PropTypes.array
    }).isRequired,
    outputType: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired
};

BuildScriptPowaWithFacade.defaultProps = {
    isApertura: false,
    firstVideoCuerpoAutoplay: false,
    firstVideoId: '',
    tituloVideo: ''
};
