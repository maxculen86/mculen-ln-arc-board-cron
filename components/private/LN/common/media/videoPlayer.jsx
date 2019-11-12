import React from 'react';
import VideoPlayer from '../../../common/videoPlayer';
import VideoPlayerSnippet from './videoPlayerSnippet';

// TODO: propTypes
export default ({ videoId, mediaData }) => {
    return (
        // TODO: esto era un <a>. Igual se acomoda mal en la grilla
        <div className="figure">
            <div className="content-video video">
                <VideoPlayer videoId={videoId} />
                <VideoPlayerSnippet mediaData={mediaData} />
            </div>
        </div>
    );
};
