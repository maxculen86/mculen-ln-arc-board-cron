import { useEffect, useRef, useState } from 'react';
import loadJWPlayerScript from '../../../../chains/utils/loadJWPlayerScript';

export function useJWPlayer(videoId) {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const playerId = 'OSRCuuxn';
    const playerRef = useRef(null);

    useEffect(() => {
        loadJWPlayerScript(playerId, () => setIsScriptLoaded(true));
    }, [playerId]);

    useEffect(() => {
        if (!playerRef.current && isScriptLoaded) {
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
    }, [videoId, isScriptLoaded]);

    return {
        playerRef,
        isScriptLoaded
    };
}
