import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../../../components/private/common/videoPlayerJw/index';

const Video = ({ videoData }) => {
    return (
        <section className="container-vw-100 bg-dark-100">
            <VideoPlayer data={videoData} isOtt />
        </section>
    );
};

Video.propTypes = {
    videoId: PropTypes.string.isRequired,
    videoData: PropTypes.shape.isRequired,
    arcSite: PropTypes.string
};

Video.defaultProps = {
    arcSite: 'ott'
};

export default Video;
