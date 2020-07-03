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
        this.apiEnv = API_ENV || 'sandbox';
        if (this.props.apiEnv) this.apiEnv = this.props.apiEnv;
    }

    componentDidMount() {
        !this.props.isAdmin && window.powaBoot();
        this.setPrerollAdsForPowa();
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
