import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayerJW from '../../../../private/common/videoPlayerJw';

function MediaVideo({ data }) {
    return (
        <VideoPlayerJW
            data={data}
            hasAutoplay
            videoContainerClassesProps="w-100 ml-0"
            mediaContainerClassesProps="mb-0"
        />
    );
}
MediaVideo.propTypes = {
    data: PropTypes.shape({}).isRequired
};

export default MediaVideo;
