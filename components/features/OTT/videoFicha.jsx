import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import VideoTabContainer from '../../private/OTT/features/videoTab/containers/videoTab';

class VideoFicha extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <VideoTabContainer />;
    }
}

// VideoFicha.propTypes = {
//     customFields: PropTypes.shape({

//     })
// };

export default VideoFicha;
