import {
    buildTagsUrl,
    onJwPlayerReady,
    handleTimeTracking,
    trackMilestone
} from '../../../../private/common/videoPlayerJw/utils/helperJw';
import { getAdsConfigVideoJw, handleEventSwipeVideo } from '../helpers';

export const registerPlayerEvents = ({
    player,
    sentProgressRef,
    videoId,
    title,
    handleNextCallback,
    origin,
    roofData,
    titleJwPlayer,
    duration
}) => {
    if (!player) {
        return;
    }

    player.on('time', event => {
        handleTimeTracking({
            event,
            sentProgressRef,
            videoId,
            title
        });
    });

    player.on('ready', () => {
        onJwPlayerReady(player, {
            currentTitle: titleJwPlayer,
            duration: duration * 1000
        });
    });

    player.on('complete', () => {
        trackMilestone({
            sentProgressRef,
            percentage: 100,
            videoId,
            title
        });

        handleNextCallback();
    });

    player.on('play', () => {
        handleEventSwipeVideo({
            videoIdObserved: videoId,
            videoTitle: title,
            origin,
            roofData
        });
    });
};

export const setupPlayer = ({
    playerId,
    videoId,
    videoFile,
    shouldUsePreferredFile,
    urlAds,
    counterVideo
}) => {
    const playerInstance = window?.jwplayer?.(playerId);
    const fileToPlay = shouldUsePreferredFile
        ? videoFile
        : `https://cdn.jwplayer.com/videos/${videoId}.mp4`;

    return playerInstance?.setup({
        file: fileToPlay,
        image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
        width: '100%',
        allowFullscreen: false,
        ...getAdsConfigVideoJw({
            adsUrl: buildTagsUrl(urlAds),
            customValidation: counterVideo === 3
        })
    });
};
