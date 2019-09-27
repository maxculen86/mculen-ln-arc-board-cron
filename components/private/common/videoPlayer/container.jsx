import React, { PureComponent } from 'react';
import VideoPlayerComponent from './component';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import { API_ENV } from 'fusion:environment';

//TODO: prueba de concepto. Test pendientes para cuando definan que se necesita hacer y que no
//en un player de video

class VideoPlayer extends PureComponent {
    constructor(props) {
        super(props);
        const siteVars = getProperties(props.arcSite);
        this.organizationId = siteVars.organizationId;
        console.log('-----------------', API_ENV);
        // TODO: en sandbox no esta lvantando la variable de enviroment
        this.apiEnv = API_ENV || 'sandbox';
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
};

export default Context(VideoPlayer);
