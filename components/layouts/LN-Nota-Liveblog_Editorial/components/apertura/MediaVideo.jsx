import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayerJW from '../../../../private/common/videoPlayerJw';

function MediaVideo({ data }) {
    return (
        <VideoPlayerJW
            data={data}
            hasAutoplay
            videoContainerClassesProps="w-100 liveBlog_video"
            mediaContainerClassesProps="mb-0"
        />
    );
}
MediaVideo.propTypes = {
    data: PropTypes.shape({}).isRequired
};

export default MediaVideo;
