/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import ComSource from './com-source';

function ModVideo({
    controls,
    image,
    video,
    autoplay = true,
    muted = true,
    loop = true,
    playsinline = true
}) {
    if (!video) return null;

    return (
        <video
            loop={loop}
            autoPlay={autoplay}
            className="mod-video"
            muted={muted}
            poster={image}
            controls={controls}
            playsInline={playsinline}
        >
            <ComSource src={video} type="video/mp4" />
        </video>
    );
}

export default ModVideo;
