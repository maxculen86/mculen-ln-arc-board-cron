import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../common/videoPlayer';
import '../../../../resources/dist/css/ln/components/video-player.css';
import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';

const Video = ({ videoId, videoData, arcSite }) => {
    const videoImageData = replaceUrlResizerToWWW(videoData);
    return (
        <section className="apertura --video">
            <VideoPlayer
                videoId={videoId}
                videoImageData={videoImageData}
                arcSite={arcSite}
                isApertura
            />
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
