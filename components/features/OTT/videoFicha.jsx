import React from 'react';
import PropTypes from 'prop-types';
import VideoTabContainer from '../../private/OTT/ficha/videoTab';
// TODO: Se quito el StaticContent

const VideoFicha = () => {
    return <VideoTabContainer />;
};

export default VideoFicha;

VideoFicha.propTypes = {
    id: PropTypes.string.isRequired
};
