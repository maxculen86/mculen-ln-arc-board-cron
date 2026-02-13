import React, { useEffect, useRef, memo, useState } from 'react';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import { useVideoJwCustomSettings } from '../hooks';
import urlForPrerollAds from '../../../../private/LN/common/utils/urlForPrerollAds';
import { buildTagsUrl } from '../../../../private/common/videoPlayerJw/utils/helperJw';
import { getAdsConfigVideoJw, handleEventSwipeVideo } from '../helpers';
import {
    registerJwVideoControlsTracking,
    markProgrammaticMute,
    registerVideoResumeTracking
} from '../../../../private/common/utils/videoPlayerHelper';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

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
    const resumeCleanupRef = useRef(null);

    const sentProgressRef = useRef(new Set());

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
                sentProgressRef.current = new Set();

                markProgrammaticMute(playerRef.current);
                playerRef.current.setMute(
                    window?.localStorage?.getItem('jwplayer.mute') === 'true'
                );

                playerRef.current.on('time', e => {
                    const percent = Math.floor(
                        (e.currentTime / e.duration) * 100
                    );

                    const percentages = [25, 50, 75];

                    percentages.forEach(percentage => {
                        if (
                            percent >= percentage &&
                            !sentProgressRef.current.has(percentage)
                        ) {
                            sentProgressRef.current.add(percentage);

                            addEventToDataLayerV2({
                                event: String(percentage),
                                rest: {
                                    videoID: String(videoId || ''),
                                    videoName: String(title || '')
                                }
                            });
                        }
                    });
                });

                playerRef.current.on('complete', () => {
                    if (!sentProgressRef.current.has(100)) {
                        sentProgressRef.current.add(100);

                        addEventToDataLayerV2({
                            event: '100',
                            rest: {
                                videoID: String(videoId || ''),
                                videoName: String(title || '')
                            }
                        });
                    }

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

            resumeCleanupRef.current?.();
            resumeCleanupRef.current = registerVideoResumeTracking({
                player: playerRef.current,
                defaultTitle: title,
                defaultId: videoId
            });
        }
    }, [
        shouldInstanceVideo,
        isLoadedScriptJw,
        handleNextCallback,
        urlAds,
        videoId,
        title,
        origin,
        counterVideo
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
