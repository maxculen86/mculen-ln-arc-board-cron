import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComSource from './com-source';

//import '../../../resources/dist/css/ln/modules/mod-video.css';

const ModVideo = props => {
    const { image, video } = props;
    if (!video) return null;

    return (
        <video
            autoplay
            loop
            className="mod-video"
            muted
            plays-inline
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
