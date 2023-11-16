import React from 'react';
import PropTypes from 'prop-types';
import VideoTabContainer from '../../private/OTT/ficha/videoTab';
import StaticContent from '../../private/common/staticContent';

const VideoFicha = () => {
    return (
        <StaticContent>
            <VideoTabContainer />
        </StaticContent>
    );
};

export default VideoFicha;

VideoFicha.propTypes = {
    id: PropTypes.string.isRequired
};
