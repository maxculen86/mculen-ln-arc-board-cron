import { useCallback, useRef, useState } from 'react';
import { useContent } from 'fusion:content';
import loadJWPlayerScript from '../../../../chains/utils/loadJWPlayerScript';
import { markProgrammaticMute } from '../../../../private/common/utils/videoPlayerHelper';
import { onJwPlayerReady } from '../../../../private/common/videoPlayerJw/utils/helperJw';

export function useJWPlayer(videoId) {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const hasStartedLoadingRef = useRef(false);
    const playerRef = useRef(null);
    const playerId = 'OSRCuuxn';

    const { duration, title } =
        useContent({
            source: videoId ? 'videosJwCarruselSource' : null,
            query: { id: videoId, website: 'la-nacion-ar' }
        }) || null;

    const loadPlayer = useCallback(() => {
        if (!hasStartedLoadingRef.current) {
            hasStartedLoadingRef.current = true;
            loadJWPlayerScript(playerId, () => setIsScriptLoaded(true));
        }
    }, []);

    const setupPlayer = useCallback(() => {
        if (!playerRef.current && isScriptLoaded) {
            const playerInstance = window?.jwplayer?.(videoId);
            playerRef.current = playerInstance?.setup({
                file: `https://cdn.jwplayer.com/videos/${videoId}.mp4`,
                image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
                width: '100%',
                allowFullscreen: false
            });
            playerRef.current.on('ready', () => {
                onJwPlayerReady(playerRef.current, {
                    currentTitle: title,
                    duration: duration * 1000
                });
            });
            if (playerRef.current) {
                markProgrammaticMute(playerRef.current);
                playerRef.current.setMute(
                    window?.localStorage?.getItem('jwplayer.mute') === 'true'
                );
            }
        }
    }, [videoId, isScriptLoaded]);

    return {
        loadPlayer,
        setupPlayer,
        playerRef,
        isScriptLoaded
    };
}
