import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComSource from './com-source';

//import '../../../resources/dist/css/ln/modules/mod-video.css';

const ModVideo = props => {
    const { image, video, autoplay, controls, muted } = props;
    if (!video) return null;

    return (
        <video
            loop="true"
            autoplay={autoplay}
            controls={controls}
            className="mod-video"
            muted={muted || 'muted'}
            playsinline="true"
            poster={image}
        >
            <ComSource src={video} type="video/mp4" />
        </video>
    );
};

ModVideo.propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string.isRequired,
    media: PropTypes.string,
    alt: PropTypes.string,
    classCondition: PropTypes.string
};

export default ModVideo;
