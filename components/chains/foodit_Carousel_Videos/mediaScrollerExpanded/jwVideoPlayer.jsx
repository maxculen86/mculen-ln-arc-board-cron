import React, { useEffect, useRef, memo, useState } from 'react';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { handleEventVideoView } from '../_helper';

function JwVideoPlayer({
    videoId,
    title,
    index,
    isLoadedScriptJw,
    handleNextCallback
}) {
    const { currentIndex } = useCajaCarruselContext();

    const [loading, setLoading] = useState(true);
    const playerRef = useRef(null);
    const handleNextRef = useRef(handleNextCallback);

    useEffect(() => {
        handleNextRef.current = handleNextCallback;
    }, [handleNextCallback]);

    const isInView = currentIndex === index;
    const shouldInstanceVideo = !loading && isInView && isLoadedScriptJw;

    useEffect(() => {
        if (isInView) setLoading(false);
    }, [isInView]);

    useEffect(() => {
        if (!playerRef.current && shouldInstanceVideo && window?.jwplayer) {
            const playerInstance = window.jwplayer(videoId);
            playerRef.current = playerInstance?.setup({
                file: `https://cdn.jwplayer.com/videos/${videoId}.mp4`,
                image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
                width: '100%',
                allowFullscreen: false,
                mute: true,
                autostart: true
            });

            if (playerRef.current) {
                playerRef.current.on('play', () => {
                    handleEventVideoView({
                        videoIdObserved: videoId,
                        videoTitle: title
                    });
                });

                playerRef.current.on('complete', () => {
                    handleNextRef.current();
                });
            }
        }

        return () => {
            if (playerRef.current) {
                try {
                    playerRef.current.remove();
                    playerRef.current = null;
                } catch (error) {
                    console.warn(error);
                }
            }
        };
    }, [shouldInstanceVideo, videoId, isLoadedScriptJw]);

    useEffect(() => {
        if (playerRef.current) {
            if (isInView) {
                playerRef.current.play();
            } else {
                playerRef.current.pause();
            }
        }
    }, [isInView]);

    if (shouldInstanceVideo) return <div id={videoId} />;

    return (
        <div className="placeholder-jwplayer flex flex-column w-100 h-100 ratio-6-19 jc-center ai-center bg-black" />
    );
}

export default memo(JwVideoPlayer);
