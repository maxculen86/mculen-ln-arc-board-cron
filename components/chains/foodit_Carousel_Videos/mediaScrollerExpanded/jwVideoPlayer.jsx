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
    const videoIdRef = useRef(videoId);
    const titleRef = useRef(title);

    const isInView = currentIndex === index;
    const canCreatePlayer = !loading && isLoadedScriptJw;
    const playerId = `${videoId}-${index}`;

    videoIdRef.current = videoId;
    titleRef.current = title;

    useEffect(() => {
        handleNextRef.current = handleNextCallback;
    }, [handleNextCallback]);

    useEffect(() => {
        if (isInView) setLoading(false);
    }, [isInView]);

    useEffect(() => {
        if (playerRef.current || !canCreatePlayer || !window?.jwplayer) {
            return undefined;
        }

        const playerInstance = window.jwplayer(playerId);
        playerRef.current = playerInstance?.setup({
            file: `https://cdn.jwplayer.com/videos/${videoId}.mp4`,
            image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
            width: '100%',
            allowFullscreen: false,
            mute: false,
            autostart: isInView
        });

        if (playerRef.current) {
            playerRef.current.on('play', () => {
                handleEventVideoView({
                    videoIdObserved: videoIdRef.current,
                    videoTitle: titleRef.current
                });
            });

            playerRef.current.on('complete', () => {
                handleNextRef.current();
            });
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
    }, [canCreatePlayer, videoId]);

    useEffect(() => {
        if (!playerRef.current) {
            return;
        }

        if (isInView) {
            playerRef.current.play();
        } else {
            playerRef.current.pause();
        }
    }, [isInView]);

    if (canCreatePlayer) return <div id={playerId} />;

    return (
        <div className="placeholder-jwplayer flex flex-column w-100 h-100 ratio-6-19 jc-center ai-center bg-black" />
    );
}

export default memo(JwVideoPlayer);
