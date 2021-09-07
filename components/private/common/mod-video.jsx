import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComSource from './com-source';
//import '../../../resources/dist/css/ln/modules/mod-video.css';

const ModVideo = props => {
    const {
        image,
        video,
        autoplay,
        controls,
        muted,
        loop,
        playsinline
    } = props;
    if (!video) return null;

    return (
        <video
            className="mod-video"
            loop={loop}
            autoplay={autoplay}
            controls={controls}
            muted={muted}
            playsinline={playsinline}
            poster={image}
        >
            <ComSource src={video} type="video/mp4" />
        </video>
    );
};

ModVideo.propTypes = {
    image: PropTypes.string,
    video: PropTypes.string.isRequired,
    autoplay: PropTypes.bool,
    controls: PropTypes.bool,
    muted: PropTypes.string,
    playsinline: PropTypes.bool,
    loop: PropTypes.bool
};

ModVideo.defaultProps = {
    image: undefined,
    video: undefined,
    autoplay: '',
    controls: undefined,
    muted: 'muted',
    playsinline: 'true',
    loop: 'true'
};

export default ModVideo;
