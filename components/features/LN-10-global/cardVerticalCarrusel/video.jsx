import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { cx } from '@ln/cva';

const Video = memo(({ src, poster, isPlaying, ...rest }) => {
    const videoRef = useRef(null);
    const classNameVideo = cx('w-100 h-100', { none: !isPlaying });

    useEffect(() => {
        if (isPlaying) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isPlaying]);

    return (
        <>
            <Adaptableimage
                src={poster}
                alt="Imagen poster de video"
                className="w-100 h-100"
                style={{
                    display: isPlaying ? 'none' : undefined
                }}
            />
            <video
                style={{ objectFit: 'cover' }}
                className={classNameVideo}
                src={src}
                ref={videoRef}
                playsInline
                loop
                muted
                {...rest}
            />
        </>
    );
});

Video.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired
};
export default Video;
