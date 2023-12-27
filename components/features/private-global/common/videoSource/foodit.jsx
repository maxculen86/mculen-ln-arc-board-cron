import React from 'react';

const VideoSource = ({
    video = '',
    image = '',
    autoplay = true,
    controls = false,
    muted = true,
    loop = true,
    playsinline = true,
    className = ''
}) => {
    if (!video) return <></>;

    return (
        <video
            loop={loop}
            autoPlay={autoplay}
            className={className}
            muted={muted}
            poster={image}
            controls={controls}
            playsInline={playsinline}
        >
            <source src={video} type="video/mp4" />
        </video>
    );
};

export default VideoSource;
