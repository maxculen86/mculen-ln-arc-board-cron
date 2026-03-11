import React from 'react';
import VideoPlayerJW from '../../../../private/common/videoPlayerJw';

function MediaVideo({ data, hasAutoplay = true, classes = {} }) {
    return <VideoPlayerJW data={data} hasAutoplay={hasAutoplay} {...classes} />;
}

export default MediaVideo;
