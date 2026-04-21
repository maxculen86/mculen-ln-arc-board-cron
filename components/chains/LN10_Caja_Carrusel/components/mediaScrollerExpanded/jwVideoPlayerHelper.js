import {
    buildTagsUrl,
    onJwPlayerReady
} from '../../../../private/common/videoPlayerJw/utils/helperJw';
import { getAdsConfigVideoJw, handleEventSwipeVideo } from '../helpers';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const PROGRESS_MILESTONES = [25, 50, 75];

const trackMilestone = ({ sentProgressRef, percentage, videoId, title }) => {
    if (sentProgressRef.current.has(percentage)) {
        return;
    }

    sentProgressRef.current.add(percentage);

    addEventToDataLayerV2({
        event: String(percentage),
        rest: {
            videoID: String(videoId || ''),
            videoName: String(title || '')
        }
    });
};

const handleTimeTracking = ({ event, sentProgressRef, videoId, title }) => {
    const percent = Math.floor((event.currentTime / event.duration) * 100);

    PROGRESS_MILESTONES.forEach(percentage => {
        if (percent >= percentage) {
            trackMilestone({
                sentProgressRef,
                percentage,
                videoId,
                title
            });
        }
    });
};

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
