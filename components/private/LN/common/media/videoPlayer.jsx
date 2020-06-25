import React from 'react';
import PropTypes from 'fusion:prop-types';
import VideoPlayer from '../../../common/videoPlayer';
import VideoPlayerSnippet from '../../../common/scriptManager/snippetVideo';

const video = ({ videoId, mediaData }) => {
    return (
        <div className="mod-video">
            <VideoPlayer videoId={videoId} />
            <VideoPlayerSnippet mediaData={mediaData} />
        </div>
    );
};

video.propTypes = {
    mediaData: PropTypes.shape({
        type: PropTypes.oneOf(['video']),
        url: PropTypes.string,
        caption: PropTypes.string
    }).isRequired,
    videoId: PropTypes.string.isRequired
};

export default video;
