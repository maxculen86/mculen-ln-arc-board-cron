/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import deviceType from '../../LN/common/utils/deviceType';
import {
    buildScriptPowa,
    removeFacade,
    handleClickEvent,
    withAutoPlay,
    setIntersectionObserver
} from '../utils/videoPlayerHelper';
import ImageArticle from '../../LN/common/media/imageBase';

export default function BuildScriptPowaWithFacade({
    firstVideoCuerpoAutoplay,
    isApertura,
    firstVideoId,
    aperturaVideo,
    videoId,
    apiEnv,
    videoImageData,
    outputType
}) {
    const { height, width } = videoImageData || {};
    const isVideoVertical = height > width;

    const classCondition = isVideoVertical
        ? 'content-facade --vertical-video'
        : 'content-facade';

    return (
        <>
            <div className={classCondition} id={videoId}>
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

                    window.addEventListener('load', () => {
                        const isDesktop = deviceType() === 'desktop'
                        const videoPlayerList = document.querySelectorAll('.video-player');
                        
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
                        });
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
    outputType: PropTypes.string.isRequired
};

BuildScriptPowaWithFacade.defaultProps = {
    isApertura: false,
    firstVideoCuerpoAutoplay: false,
    firstVideoId: ''
};
