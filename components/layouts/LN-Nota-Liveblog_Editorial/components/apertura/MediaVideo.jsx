import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayerJW from '../../../../private/common/videoPlayerJw';

function MediaVideo({ data, hasAutoplay, classes }) {
    return <VideoPlayerJW data={data} hasAutoplay={hasAutoplay} {...classes} />;
}
MediaVideo.propTypes = {
    data: PropTypes.shape({}).isRequired,
    hasAutoplay: PropTypes.bool,
    classes: PropTypes.shape({
        videoContainerClassesProps: PropTypes.string,
        mediaContainerClassesProps: PropTypes.string
    })
};

MediaVideo.defaultProps = {
    hasAutoplay: true,
    classes: {}
};

export default MediaVideo;
