import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { useHandlePlayVideoCarrusel, useObserverMobAndTab } from './hooks';
import { getClassNamesMedia } from './helpers';
import Image from '../../ui-ln/image/default';

function Video({ src, poster, isPlaying, setIsPlaying, ...rest }) {
    const videoRef = useRef(null);

    const { classNamePoster, classNameVideo } = getClassNamesMedia(isPlaying);

    useHandlePlayVideoCarrusel({
        videoRef,
        isPlaying
    });

    useObserverMobAndTab({
        videoRef,
        setIsPlaying
    });

    return (
        <>
            <Image
                src={poster}
                alt="Imagen poster de video"
                className={classNamePoster}
                data-testid="poster-image"
            />
            <video
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
}

Video.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    setIsPlaying: PropTypes.func.isRequired
};

export default memo(Video);
