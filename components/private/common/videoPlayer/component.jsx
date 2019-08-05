import React from 'react';

export default props => {
    return (
        <div
            className="powa"
            data-org={props.orgId}
            data-uuid={props.videoId}
            data-ads={props.enableAds}
            data-ad-bar={props.enableAdBar}
            data-autoinit={props.loadVideoOnInit ? 'native-hls' : 'false'}
            data-autoplay={props.autoPlay}
            data-controls={props.enableControls}
            data-muted={props.muted}
            data-sticky={props.sticky}
            data-api={props.apiEnv}
            data-env="prod"
        />
    );
};
