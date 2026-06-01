import React from 'react';

function VideoZocalo({ src, className, ...props }) {
    if (!src) return null;

    return (
        <div data-tw className="contents">
            <video
                className={className}
                loop
                autoPlay
                muted
                playsInline
                {...props}
            >
                <source src={src} />
            </video>
        </div>
    );
}

export default VideoZocalo;
