import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import { API_ENV } from 'fusion:environment';
import VideoPlayerComponent from './component';
import WithScreenUtils from '../hocs/withScreenUtils';

// TODO: prueba de concepto. Test pendientes para cuando definan que se necesita hacer y que no
// en un player de video

class VideoPlayer extends PureComponent {
    constructor(props) {
        super(props);
        const siteVars = getProperties(props.arcSite);
        this.organizationId = siteVars.organizationId;
        this.adsURL = props.adsURL;
        // TODO: en sandbox no esta lvantando la variable de enviroment

        this.apiEnv = `${API_ENV}` || 'sandbox';
        if (this.props.apiEnv) this.apiEnv = this.props.apiEnv;
        this.addToDataLayer = this.addToDataLayer.bind(this);
    }

    componentDidMount() {
        const { isAdmin, tituloVideo, videoId } = this.props;
        if (!isAdmin && window && window.powaBoot) window.powaBoot();
        this.setPrerollAdsForPowa();
        this.setVideoEvents(tituloVideo, videoId);
        this.addToDataLayer('videoDisplay', tituloVideo, videoId);
    }

    setPrerollAdsForPowa = () => {
        window.PoWaSettings = window.PoWaSettings || {};
        window.PoWaSettings.advertising = window.PoWaSettings.advertising || {};

        window.PoWaSettings.advertising.adTag = (() => {
            let videosPlayed = 0;
            return ({ powa, videoData }) => {
                const playAd = videosPlayed % 2 === 0;
                videosPlayed += 1;
                return playAd &&
                    videoData.additional_properties.advertising.playAds
                    ? this.adsURL
                    : '';
            };
        })();
    };

    setVideoEvents = (tituloVideo, videoId) => {
        const _this = this;
        window.addEventListener('powaReady', event => {
            const player = event.detail.powa;
            const playerID = event.detail.id;

            if (!playerID.includes(videoId)) return null;

            _this.setProgressEvent(player, tituloVideo, videoId);
            _this.setEvent(player, 'play', 'videoPlay', tituloVideo, videoId);
            _this.setEvent(
                player,
                'complete',
                'videoComplete',
                tituloVideo,
                videoId
            );
        });
    };

    setEvent = (player, event, eventName, tituloVideo, videoId) => {
        player.on(event, () => {
            this.addToDataLayer(eventName, tituloVideo, videoId);
        });
    };

    setProgressEvent = (player, tituloVideo, videoId) => {
        const eventCases = {
            '0': () => {},
            '25': () => {
                if (!this.isInDatalayerEvent('25', videoId)) {
                    this.addToDataLayer('25', tituloVideo, videoId);
                }
            },
            '50': () => {
                if (!this.isInDatalayerEvent('50', videoId)) {
                    this.addToDataLayer('50', tituloVideo, videoId);
                }
            },
            '75': () => {
                if (!this.isInDatalayerEvent('75', videoId)) {
                    this.addToDataLayer('75', tituloVideo, videoId);
                }
            }
        };

        player.on('time', (event, eventName) => {
            const percent = Math.floor((event.time / event.duration) * 100);
            (eventCases[percent] || eventCases['0'])();
        });
    };

    addToDataLayer = (eventName, tituloVideo, videoId) => {
        window.dataLayer.push({
            event: eventName,
            videoName: tituloVideo,
            videoID: videoId
        });
    };

    isInDatalayerEvent = (event, videoId) => {
        const result =
            window &&
            window.dataLayer &&
            window.dataLayer.find(
                element =>
                    element.event === event && element.videoID === videoId
            );

        return result || false;
    };

    render() {
        return (
            <>
                <VideoPlayerComponent
                    videoId={this.props.videoId}
                    orgId={this.organizationId}
                    enableAds={this.props.enableAds}
                    enableAdBar={this.props.enableAdBar}
                    loadVideoOnInit={this.props.loadVideoOnInit}
                    autoPlay={this.props.autoPlay}
                    enableControls={this.props.enableControls}
                    muted={this.props.muted}
                    sticky={this.props.sticky}
                    apiEnv={this.apiEnv}
                />
            </>
        );
    }
}

VideoPlayer.propTypes = {
    videoId: PropTypes.string.isRequired,
    tituloVideo: PropTypes.string.isRequired,
    enableAds: PropTypes.bool,
    enableAdBar: PropTypes.bool,
    loadVideoOnInit: PropTypes.bool,
    autoPlay: PropTypes.bool,
    enableControls: PropTypes.bool,
    muted: PropTypes.bool,
    sticky: PropTypes.bool,
    apiEnv: PropTypes.string,
    adsURL: PropTypes.string.isRequired
};

// VideoPlayer.defaultProps = {
//     enableAds: true,
//     loadVideoOnInit: true
// };

export default Context(WithScreenUtils(VideoPlayer));
