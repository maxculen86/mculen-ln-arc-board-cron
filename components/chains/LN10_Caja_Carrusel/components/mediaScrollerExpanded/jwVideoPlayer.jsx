import React, { useEffect, useRef, memo, useState } from 'react';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { useVideoJwCustomSettings } from '../hooks';
import urlForPrerollAds from '../../../../private/LN/common/utils/urlForPrerollAds';
import { buildTagsUrl } from '../../../../private/common/videoPlayerJw/utils/helperJw';
import { getAdsConfigVideoJw, handleEventSwipeVideo } from '../helpers';
import {
    registerJwVideoControlsTracking,
    markProgrammaticMute
} from '../../../../private/common/utils/videoPlayerHelper';

function JwVideoPlayer({
    videoId,
    title,
    index,
    counterVideo,
    handleNextCallback,
    isLoadedScriptJw,
    origin = ''
}) {
    const { currentIndex } = useCajaCarruselContext();

    const [loading, setLoading] = useState(true);
    const playerRef = useRef(null);
    const controlsCleanupRef = useRef(null);

    const isInView = currentIndex === index;
    const shouldInstanceVideo = !loading && isInView;
    const urlAds = urlForPrerollAds();

    useEffect(() => {
        if (isInView) setLoading(false);
    }, [currentIndex]);

    useEffect(() => {
        const urlWithPermutiveSegment = buildTagsUrl(urlAds);
        if (!playerRef.current && shouldInstanceVideo && isLoadedScriptJw) {
            const playerInstance = window?.jwplayer?.(videoId);
            playerRef.current = playerInstance?.setup({
                file: `https://cdn.jwplayer.com/videos/${videoId}.mp4`,
                image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
                width: '100%',
                allowFullscreen: false,
                ...getAdsConfigVideoJw({
                    adsUrl: urlWithPermutiveSegment,
                    customValidation: counterVideo === 3
                })
            });
            if (playerRef.current) {
                markProgrammaticMute(playerRef.current);
                playerRef.current.setMute(
                    window?.localStorage?.getItem('jwplayer.mute') === 'true'
                );
                playerRef.current.on('complete', () => {
                    handleNextCallback();
                });
                playerRef.current.on('play', () => {
                    handleEventSwipeVideo({
                        videoIdObserved: videoId,
                        videoTitle: title,
                        origin
                    });
                });
            }

            controlsCleanupRef.current?.();
            controlsCleanupRef.current = registerJwVideoControlsTracking({
                player: playerRef.current,
                defaultTitle: title,
                defaultId: videoId
            });
        }
    }, [shouldInstanceVideo, isLoadedScriptJw, handleNextCallback]);

    useVideoJwCustomSettings({
        isInView,
        loading,
        playerRef
    });

    useEffect(
        () => () => {
            controlsCleanupRef.current?.();
            controlsCleanupRef.current = null;
        },
        []
    );

    if (shouldInstanceVideo) return <div id={videoId} />;

    return (
        <div className="placeholder-jwplayer flex flex-column w-100 h-100 ratio-6-19 jc-center ai-center bg-black" />
    );
}

export default memo(JwVideoPlayer);
