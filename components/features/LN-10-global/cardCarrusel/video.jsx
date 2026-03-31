import React, { useRef, memo } from 'react';
import { useHandlePlayVideoCarrusel, useObserverMobAndTab } from './hooks';
import { getClassNamesMedia } from './helpers';
import Image from '../../ui/ln/image/default';

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
                preload="none"
                {...rest}
            />
        </>
    );
}

export default memo(Video);
