/* eslint-disable react/require-default-props */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import { API_ENV } from 'fusion:environment';
import { streamingAnalyticsInit } from './comscoreStreamingTag';
import get from '../utils/get';
import { VIDEO } from '../utils/subtypes/subtypeHelper';
import useTermica from '../hooks/useTermica';
import {
    setPrerollAdsForPowa,
    setCustomErrorsVideoPlayer,
    getClassCondition,
    addToDataLayer,
    setVideoEvents
} from '../utils/videoPlayerHelper';
import BuildScriptPowaWithFacade from './BuildScriptPowaWithFacade';
import '../../../../resources/dist/css/ln/components/video-player.css';

const VideoPlayer = props => {
    const {
        arcSite,
        adsURL,
        tituloVideo,
        isAdmin,
        videoId,
        enableAds,
        enableAdBar,
        loadVideoOnInit,
        autoPlay,
        enableControls,
        sticky,
        globalContent = {},
        isApertura,
        videoImageData,
        outputType
    } = props;

    const withFacade =
        get(globalContent, 'type', '') === 'story' || arcSite === 'ott';

    const isVideoType =
        get(globalContent, 'promo_items.basic.type') === 'video' ||
        get(globalContent, 'promo_items.apertura_multimedia.type') === 'video';

    const aperturaVideo =
        isVideoType &&
        get(
            globalContent,
            'promo_items.apertura_multimedia',
            get(globalContent, 'promo_items.basic')
        );

    const firstBodyVideo =
        globalContent.content_elements &&
        globalContent.content_elements.find(x => x.type === 'video');

    const firstArticleVideo = isVideoType
        ? get(globalContent, 'promo_items.basic')
        : firstBodyVideo;

    const firstVideo =
        globalContent.subtype === VIDEO ? aperturaVideo : firstArticleVideo;

    const firstVideoCuerpoAutoplay = useTermica('autoplay');

    const firstVideoId = get(firstVideo, '_id');
    const siteVars = getProperties(arcSite);
    const { organizationId } = siteVars || {};
    const apiEnv = API_ENV || 'sandbox';
    const [streamingAnalyticInstance] = useState(
        (typeof window !== 'undefined' &&
            typeof ns_ !== 'undefined' &&
            streamingAnalyticsInit(arcSite, tituloVideo)) ||
            {}
    );

    useEffect(() => {
        if (!isAdmin && window && window.powaBoot) window.powaBoot();
        setCustomErrorsVideoPlayer();
        setPrerollAdsForPowa(adsURL);
        window.addEventListener('powaReady', event =>
            setVideoEvents(
                event,
                videoId,
                tituloVideo,
                true,
                streamingAnalyticInstance
            )
        );
        addToDataLayer('videoDisplay', tituloVideo, videoId);
        return () =>
            window.removeEventListener('powaReady', event =>
                setVideoEvents(
                    event,
                    videoId,
                    tituloVideo,
                    true,
                    streamingAnalyticInstance
                )
            );
    }, [adsURL, isAdmin, tituloVideo, videoId, streamingAnalyticInstance]);

    return (
        <>
            <div
                className={`video-player${getClassCondition(
                    withFacade,
                    isApertura
                )}`}
            >
                {withFacade && (
                    <BuildScriptPowaWithFacade
                        firstVideoCuerpoAutoplay={firstVideoCuerpoAutoplay}
                        isApertura={isApertura}
                        firstVideoId={firstVideoId}
                        tituloVideo={tituloVideo}
                        aperturaVideo={aperturaVideo}
                        videoId={videoId}
                        apiEnv={apiEnv}
                        videoImageData={videoImageData}
                        outputType={outputType}
                        arcSite={arcSite}
                    />
                )}

                <div
                    className="powa"
                    data-org={organizationId}
                    data-uuid={videoId}
                    data-ads={enableAds}
                    data-ad-bar={enableAdBar}
                    data-autoinit={loadVideoOnInit ? 'native-hls' : 'false'}
                    data-autoPlay={autoPlay}
                    data-autoplay-muted={autoPlay}
                    data-controls={enableControls}
                    data-muted={isApertura ? true : firstVideoCuerpoAutoplay}
                    data-sticky={sticky}
                    data-api={apiEnv}
                    data-env="prod"
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.addEventListener('powaError', () => {
                            const facade = document.querySelector('.content-facade');
                            if (facade) facade.remove();
                        });`
                    }}
                />
            </div>
        </>
    );
};

VideoPlayer.propTypes = {
    videoId: PropTypes.string.isRequired,
    tituloVideo: PropTypes.string.isRequired,
    arcSite: PropTypes.string,
    enableAds: PropTypes.bool,
    enableAdBar: PropTypes.bool,
    loadVideoOnInit: PropTypes.bool,
    autoPlay: PropTypes.bool,
    enableControls: PropTypes.bool,
    sticky: PropTypes.bool,
    isAdmin: PropTypes.bool,
    adsURL: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(PropTypes.object)
    }),
    outputType: PropTypes.string,
    isApertura: PropTypes.bool,
    videoImageData: PropTypes.shape({
        caption: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        url: PropTypes.string,
        resized_urls: PropTypes.array
    }).isRequired
};

VideoPlayer.defaultProps = {
    enableAds: true,
    loadVideoOnInit: true,
    autoPlay: false,
    enableControls: true,
    enableAdBar: true,
    sticky: false,
    isAdmin: false,
    isApertura: false,
    outputType: 'default'
};

export default Context(VideoPlayer);
