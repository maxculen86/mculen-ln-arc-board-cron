import React, { PureComponent } from 'react';
import VideoPlayerComponent from './component';
import PropTypes from 'fusion:prop-types';
import FusionContext from 'fusion:context';
import getProperties from 'fusion:properties';
import Consumer from 'fusion:consumer';

//TODO: prueba de concepto. Test pendientes para cuando definan que se necesita hacer y que no
//en un player de video

@Consumer
class VideoPlayer extends PureComponent {
    constructor(props) {
        super(props);
        const siteVars = getProperties(props.arcSite);
        this.organizationId = siteVars.organizationId;
        this.apiEnv = siteVars.videoPlayer.apiEnv;
        if (this.props.apiEnv) this.apiEnv = this.props.apiEnv;
    }

    componentDidMount() {
        this.props.isAdmin && window.powaBoot();
    }

    render() {
        return (
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
    apiEnv: PropTypes.string
};

VideoPlayer.defaultProps = {
    enableAds: true,
    loadVideoOnInit: true
    // apiEnv: 'sandbox'
};

export default FusionContext(VideoPlayer);
