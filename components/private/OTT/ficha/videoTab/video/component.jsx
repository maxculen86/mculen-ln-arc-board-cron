import React from 'react';
import VideoPlayer from '../../../../common/videoPlayer';

export default function video({ videoId }) {
    return (
        <section className="apertura --video">
            <VideoPlayer videoId={videoId} />
        </section>
    );
}
