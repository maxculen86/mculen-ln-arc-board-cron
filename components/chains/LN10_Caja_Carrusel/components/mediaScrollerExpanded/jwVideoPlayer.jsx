import React, { useEffect, useRef, memo, useState } from 'react';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { useVideoJwCustomSettings } from '../hooks';
import urlForPrerollAds from '../../../../private/LN/common/utils/urlForPrerollAds';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import {
    registerJwVideoControlsTracking,
    markProgrammaticMute,
    registerVideoResumeTracking
} from '../../../../private/common/utils/videoPlayerHelper';
import { registerPlayerEvents, setupPlayer } from './jwVideoPlayerHelper';

function JwVideoPlayer({
    videoId,
    title,
    index,
    counterVideo,
    handleNextCallback,
    isLoadedScriptJw,
    origin = '',
    variant = 'vertical',
    roofData = {},
    duration,
    titleJwPlayer
}) {
    const { currentIndex, preferredVideoFiles } = useCajaCarruselContext();

    const [loading, setLoading] = useState(true);
    const playerRef = useRef(null);
    const controlsCleanupRef = useRef(null);
    const resumeCleanupRef = useRef(null);

    const sentProgressRef = useRef(new Set());

    const isInView = currentIndex === index;
    const shouldInstanceVideo = !loading && isInView;
    const isDesktop = !isSSR() && window?.innerWidth > 1279;
    const videoFile = preferredVideoFiles?.[videoId];
    const shouldUsePreferredFile =
        isDesktop && variant === 'horizontal' && !!videoFile;
    const urlAds = urlForPrerollAds();

    useEffect(() => {
        if (isInView) setLoading(false);
    }, [currentIndex]);

    useEffect(() => {
        if (playerRef.current || !shouldInstanceVideo || !isLoadedScriptJw) {
            return;
        }

        playerRef.current = setupPlayer({
            playerId: videoId,
            videoId,
            videoFile,
            shouldUsePreferredFile,
            urlAds,
            counterVideo
        });

        if (!playerRef.current) {
            return;
        }

        sentProgressRef.current = new Set();
        markProgrammaticMute(playerRef.current);
        playerRef.current.setMute(
            window?.localStorage?.getItem('jwplayer.mute') === 'true'
        );
        registerPlayerEvents({
            player: playerRef.current,
            sentProgressRef,
            videoId,
            title,
            handleNextCallback,
            origin,
            roofData,
            titleJwPlayer,
            duration
        });
        controlsCleanupRef.current?.();
        controlsCleanupRef.current = registerJwVideoControlsTracking({
            player: playerRef.current,
            defaultTitle: title,
            defaultId: videoId
        });

        resumeCleanupRef.current?.();
        resumeCleanupRef.current = registerVideoResumeTracking({
            player: playerRef.current,
            defaultTitle: title,
            defaultId: videoId
        });
    }, [
        shouldInstanceVideo,
        isLoadedScriptJw,
        handleNextCallback,
        urlAds,
        videoId,
        videoFile,
        shouldUsePreferredFile,
        title,
        origin,
        counterVideo,
        variant,
        roofData,
        titleJwPlayer,
        duration
    ]);

    useVideoJwCustomSettings({
        isInView,
        loading,
        playerRef
    });

    useEffect(
        () => () => {
            controlsCleanupRef.current?.();
            controlsCleanupRef.current = null;
            resumeCleanupRef.current?.();
            resumeCleanupRef.current = null;
        },
        []
    );

    if (shouldInstanceVideo)
        return <div className="video-instance" id={videoId} />;

    return (
        <div className="placeholder-jwplayer flex flex-column w-100 h-100 ratio-9-16 jc-center ai-center bg-black" />
    );
}

export default memo(JwVideoPlayer);
