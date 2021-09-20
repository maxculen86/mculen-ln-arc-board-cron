/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComSource from './com-source';

const ModVideo = props => {
    const { controls, image, video, autoplay, muted, loop } = props;
    if (!video) return null;

    return (
        <video
            loop={loop}
            autoPlay={autoplay}
            className="mod-video"
            muted={muted}
            poster={image}
            controls={controls}
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
    loop: PropTypes.bool
};

ModVideo.defaultProps = {
    image: undefined,
    autoplay: '',
    controls: undefined,
    muted: false,
    loop: false
};

export default ModVideo;
