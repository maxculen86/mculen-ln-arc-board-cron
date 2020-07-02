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
        this.screenUtils = props.screenUtils;
        this.deviceResolution = {
            desktop: 'dsk',
            tablet: 'tab',
            mobile: 'mob'
        };
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
                // TODO: por ahora esta hardcodeado "Nota" en la url. Ver si hace falta hacer alguna logica para completar ese campo
                const adUrl = `https://pubads.g.doubleclick.net/gampad/ads?slotname=/133919216/la_nacion_${this.screenUtils.device}/Nota/preroll_${this.deviceResolution[this.screenUtils.device]}&sz=640x480|400x300&ciu_szs=300x250&unviewed_position_start=1&output=vast&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&cust_params&url=${
                    window.location.href
                }&description_url=${encodeURIComponent(
                    window.location.href.toString()
                )}&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0&correlator=${new Date().getTime()}`;

                const playAd = videosPlayed % 2 === 0;
                videosPlayed += 1;
                return playAd &&
                    videoData.additional_properties.advertising.playAds
                    ? adUrl
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
    screenUtils: PropTypes.shape({
        device: PropTypes.string
    }).isRequired
};

// VideoPlayer.defaultProps = {
//     enableAds: true,
//     loadVideoOnInit: true
// };

export default Context(WithScreenUtils(VideoPlayer));
