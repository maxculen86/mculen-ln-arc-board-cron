import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import { API_ENV } from 'fusion:environment';
import {
    streamingAnalyticsInit,
    comscorePlayEvent
} from './comscoreStreamingTag';

const setPrerollAdsForPowa = adsURL => {
    window.PoWaSettings = window.PoWaSettings || {};
    window.PoWaSettings.advertising = window.PoWaSettings.advertising || {};

    window.PoWaSettings.advertising.adTag = (() => {
        let videosPlayed = 0;
        return ({ powa, videoData }) => {
            const playAd = videosPlayed % 2 === 0;
            videosPlayed += 1;
            return playAd && videoData.additional_properties.advertising.playAds
                ? adsURL
                : '';
        };
    })();
    window.PoWaSettings.advertising.adBar = {
        skipOffset: 5
    };
};

const setEvent = (
    player,
    event,
    eventName,
    titulo,
    id,
    streamingAnalyticInstance = {}
) => {
    player.on(event, () => {
        addToDataLayer(eventName, titulo, id);
        event === 'play' ? comscorePlayEvent(streamingAnalyticInstance) : null;
    });
};

const setProgressEvent = (player, titulo, id) => {
    const eventCases = {
        '0': () => {},
        '25': () => {
            if (!isInDatalayerEvent('25', id)) {
                addToDataLayer('25', titulo, id);
            }
        },
        '50': () => {
            if (!isInDatalayerEvent('50', id)) {
                addToDataLayer('50', titulo, id);
            }
        },
        '75': () => {
            if (!isInDatalayerEvent('75', id)) {
                addToDataLayer('75', titulo, id);
            }
        }
    };

    player.on('time', (event, eventName) => {
        const percent = Math.floor((event.time / event.duration) * 100);
        (eventCases[percent] || eventCases['0'])();
    });
};

const addToDataLayer = (eventName, titulo, id) => {
    window.dataLayer.push({
        event: eventName,
        videoName: titulo,
        videoID: id
    });
};

const isInDatalayerEvent = (event, id) => {
    const result =
        window &&
        window.dataLayer &&
        window.dataLayer.find(
            element => element.event === event && element.videoID === id
        );

    return result || false;
};

const VideoPlayer = props => {
    const {
        arcSite,
        adsURL,
        tituloVideo,
        isAdmin,
        videoId,
        muted,
        enableAds,
        enableAdBar,
        loadVideoOnInit,
        autoPlay,
        enableControls,
        sticky
    } = props;

    const siteVars = getProperties(arcSite);
    const { organizationId } = siteVars || {};
    const apiEnv = API_ENV || 'sandbox';
    const [streamingAnalyticInstance] = useState(
        (typeof window !== 'undefined' &&
            typeof ns_ !== 'undefined' &&
            streamingAnalyticsInit(arcSite)) ||
            {}
    );

    useEffect(() => {
        const setVideoEvents = event => {
            const player = event.detail.powa;
            const playerID = event.detail.id;

            if (!playerID.includes(videoId)) return null;

            setProgressEvent(player, tituloVideo, videoId);
            setEvent(
                player,
                'play',
                'videoPlay',
                tituloVideo,
                videoId,
                streamingAnalyticInstance
            );
            setEvent(
                player,
                'complete',
                'videoComplete',
                tituloVideo,
                videoId,
                streamingAnalyticInstance
            );
        };

        if (!isAdmin && window && window.powaBoot) window.powaBoot();
        setPrerollAdsForPowa(adsURL);
        window.addEventListener('powaReady', setVideoEvents);
        addToDataLayer('videoDisplay', tituloVideo, videoId);
        return () => window.removeEventListener('powaReady', setVideoEvents);
    }, [adsURL, isAdmin, tituloVideo, videoId]);

    return (
        <div
            className="powa"
            data-org={organizationId}
            data-uuid={videoId}
            data-ads={enableAds}
            data-ad-bar={enableAdBar}
            data-autoinit={loadVideoOnInit ? 'native-hls' : 'false'}
            data-autoplay={autoPlay}
            data-autoplay-muted={autoPlay}
            data-controls={enableControls}
            data-muted={muted}
            data-sticky={sticky}
            data-api={apiEnv}
            data-env="prod"
        />
    );
};

VideoPlayer.propTypes = {
    videoId: PropTypes.string.isRequired,
    tituloVideo: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    enableAds: PropTypes.bool,
    enableAdBar: PropTypes.bool,
    loadVideoOnInit: PropTypes.bool,
    autoPlay: PropTypes.bool,
    enableControls: PropTypes.bool,
    muted: PropTypes.bool,
    sticky: PropTypes.bool,
    isAdmin: PropTypes.bool,
    adsURL: PropTypes.string.isRequired
};

VideoPlayer.defaultProps = {
    enableAds: true,
    loadVideoOnInit: true,
    autoPlay: false,
    enableControls: true,
    enableAdBar: true,
    muted: false,
    sticky: false,
    isAdmin: false
};

export default Context(VideoPlayer);
