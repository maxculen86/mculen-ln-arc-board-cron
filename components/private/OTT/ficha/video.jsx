import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../common/videoPlayer';

const Video = ({ videoId }) => {
    return (
        <section className="apertura --video">
            <VideoPlayer videoId={videoId} />
        </section>
    );
};

Video.propTypes = {
    videoId: PropTypes.string.isRequired
};

export default Video;
