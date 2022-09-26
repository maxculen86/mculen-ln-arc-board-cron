import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import VideoTabContainer from '../../private/OTT/ficha/videoTab';

const VideoFicha = props => {
    const { id: featureId } = props;
    return (
        <Static id={featureId} persistent htmlOnly>
            <VideoTabContainer />
        </Static>
    );
};

export default VideoFicha;

VideoFicha.propTypes = {
    id: PropTypes.string.isRequired
};
