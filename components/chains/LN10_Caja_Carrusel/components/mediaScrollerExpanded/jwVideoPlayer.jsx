import React, { useEffect, useRef, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { useVideoJwCustomSettings } from '../hooks';

function JwVideoPlayer({ videoId, index, handleNextCallback }) {
    const { currentIndex } = useCajaCarruselContext();

    const [loading, setLoading] = useState(true);

    const playerRef = useRef(null);

    const isInView = currentIndex === index;
    const shouldInstanceVideo = !loading && isInView;

    useEffect(() => {
        if (isInView) setLoading(false);
    }, [currentIndex]);

    useEffect(() => {
        if (!playerRef.current && shouldInstanceVideo) {
            const playerInstance = window?.jwplayer?.(videoId);
            playerRef.current = playerInstance?.setup({
                file: `https://cdn.jwplayer.com/videos/${videoId}.mp4`,
                image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
                width: '100%',
                allowFullscreen: false
            });
            playerRef?.current?.setMute(
                window?.localStorage?.getItem('jwplayer.mute') === 'true'
            );
        }
    }, [shouldInstanceVideo]);

    useVideoJwCustomSettings({
        isInView,
        loading,
        playerRef,
        handleNextCallback
    });

    if (shouldInstanceVideo) return <div id={videoId} />;

    return (
        <div className="placeholder-jwplayer flex flex-column w-100 h-100 ratio-6-19 jc-center ai-center bg-black" />
    );
}

JwVideoPlayer.propTypes = {
    videoId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    handleNextCallback: PropTypes.func.isRequired
};

export default memo(JwVideoPlayer);
