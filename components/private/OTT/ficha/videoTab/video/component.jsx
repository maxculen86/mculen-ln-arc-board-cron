import React from 'react';
import VideoPlayer from '../../../../common/videoPlayer';

export default function video({ videoId }) {
    return (
        <section className={''}>
            <VideoPlayer videoId={videoId} />
        </section>
    );
}
