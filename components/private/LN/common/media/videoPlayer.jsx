import React from 'react';
import VideoPlayer from '../../../common/videoPlayer';

// TODO: propTypes
export default ({ videoId }) => {
    return (
        // TODO: esto era un <a>. Igual se acomoda mal en la grilla
        <div className="figure">
            <div className="content-video video">
                <VideoPlayer videoId={videoId} />
            </div>
        </div>
    );
};
