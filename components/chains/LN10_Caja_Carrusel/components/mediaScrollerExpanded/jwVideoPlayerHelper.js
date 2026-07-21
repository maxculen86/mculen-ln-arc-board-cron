import {
    buildTagsUrl,
    handleTimeTracking,
    trackMilestone
} from '../../../../private/common/videoPlayerJw/utils/helperJw';
import {
    handleEventSwipeVideo,
    resetTracking,
    getAdsConfigVideoJw
} from '../helpers';
import get from '../../../../private/common/utils/get';
import { invokeMethod } from '../hooks/jwPlayerShared';

export {
    attachComscorePlugin,
    resetComscoreGuard
} from '../hooks/comscoreAttachment';

const LONG_FORM_MIN_DURATION_SECONDS = 1200;
const CONTENT_TYPE_LONG_FORM = 'vc12';
const CONTENT_TYPE_SHORT_FORM = 'vc11';

export const PREROLL_AD_VIDEO_POSITION = 3;

const VIDEO_COMPLETE_PERCENTAGE = 100;
const MUTE_STORAGE_KEY = 'jwplayer.mute';

export const isMutePreferred = () => {
    if (typeof window === 'undefined') return false;

    const localStorage = get(window, 'localStorage');
    const getItem = get(localStorage, 'getItem');

    return (
        typeof getItem === 'function' &&
        getItem.call(localStorage, MUTE_STORAGE_KEY) === 'true'
    );
};

export const shouldMuteContent = () => {
    if (typeof window === 'undefined') return true;

    const localStorage = get(window, 'localStorage');
    const getItem = get(localStorage, 'getItem');

    if (typeof getItem !== 'function') return true;

    return getItem.call(localStorage, MUTE_STORAGE_KEY) !== 'false';
};

export const loadPlaylist = (player, playlist) => {
    if (!player || !playlist) return;
    player.load(playlist);
};

const toJwSource = item => ({
    file: get(item, 'file'),
    image: get(item, 'image'),
    mediaid: get(item, 'mediaId'),
    title: get(item, 'titleJwPlayer') || get(item, 'title')
});

const buildPlaylistItem = item => {
    const duration = get(item, 'duration', 0);

    return {
        ...toJwSource(item),
        comscoreContentType:
            duration >= LONG_FORM_MIN_DURATION_SECONDS
                ? CONTENT_TYPE_LONG_FORM
                : CONTENT_TYPE_SHORT_FORM,
        comscoreClipLength: duration * 1000
    };
};

export const buildJwPlaylist = ({ playlist = [] } = {}) =>
    playlist.map(buildPlaylistItem);

export const buildAdPlayerConfig = (item, urlAds) => ({
    playlist: [toJwSource(item)],
    width: '100%',
    height: '100%',
    allowFullscreen: false,
    autostart: true,
    ...getAdsConfigVideoJw({
        adsUrl: buildTagsUrl(urlAds),
        customValidation: true
    })
});

export const setupPersistentPlayer = ({ playerId, playlist }) => {
    if (typeof window === 'undefined') return undefined;

    const jwplayer = get(window, 'jwplayer');
    if (typeof jwplayer !== 'function') return undefined;

    const playerInstance = jwplayer(playerId);
    if (!playerInstance) return undefined;

    try {
        return playerInstance.setup({
            playlist: buildJwPlaylist({ playlist }),
            width: '100%',
            height: '100%',
            allowFullscreen: false,
            autostart: false
        });
    } catch {
        return undefined;
    }
};

export const toPlaylistIndex = (listVideoData, dataIndex) =>
    listVideoData.slice(0, dataIndex + 1).filter(item => !get(item, 'isBanner'))
        .length - 1;

export const registerPersistentPlayerEvents = ({
    player,
    sentProgressRef,
    listVideoData,
    handleNextCallback,
    isAdBreakActive
}) => {
    if (!player) return () => {};

    let trackedItem = listVideoData[0];
    let lastLandedId = '';

    let lastPlaybackPercent = 0;
    let ignoreNextTimeEvent = false;

    const calculatePercent = (currentTime = 0, videoDuration = 0) =>
        videoDuration ? Math.floor((currentTime / videoDuration) * 100) : 0;

    const resolveLandedItem = event => {
        const index = get(event, 'index');
        if (
            typeof index === 'number' &&
            index >= 0 &&
            index < listVideoData.length
        ) {
            return listVideoData[index];
        }
        const mediaid = get(event, 'item.mediaid');
        if (mediaid) {
            return listVideoData.find(item => get(item, 'id') === mediaid);
        }
        return undefined;
    };

    const getActiveItem = () => trackedItem || listVideoData[0];

    const handlePlaylistItem = event => {
        const landedItem = resolveLandedItem(event);
        if (landedItem) trackedItem = landedItem;

        const landedId = get(landedItem, 'id', '');
        if (landedId !== lastLandedId) {
            sentProgressRef.current.clear();
            resetTracking();
            lastPlaybackPercent = 0;
            ignoreNextTimeEvent = false;
            lastLandedId = landedId;
        }
    };

    const handleTime = event => {
        if (isAdBreakActive?.()) return;

        const activeItem = getActiveItem();
        if (!activeItem) return;

        if (ignoreNextTimeEvent) {
            lastPlaybackPercent = calculatePercent(
                get(event, 'currentTime'),
                get(event, 'duration')
            );
            ignoreNextTimeEvent = false;
            return;
        }

        handleTimeTracking({
            event,
            sentProgressRef,
            videoId: get(activeItem, 'id'),
            title: get(activeItem, 'title'),
            lastPlaybackPercent
        });
    };

    const handleSeek = event => {
        lastPlaybackPercent = calculatePercent(
            get(event, 'offset'),
            get(event, 'duration')
        );
        ignoreNextTimeEvent = true;
    };

    const handleComplete = () => {
        if (isAdBreakActive?.()) return;

        const activeItem = getActiveItem();
        if (activeItem) {
            trackMilestone({
                sentProgressRef,
                percentage: VIDEO_COMPLETE_PERCENTAGE,
                videoId: get(activeItem, 'id'),
                title: get(activeItem, 'title')
            });
        }
        handleNextCallback();
    };

    const handlePlay = () => {
        if (isAdBreakActive?.()) return;

        const activeItem = getActiveItem();
        if (!activeItem) return;

        handleEventSwipeVideo({
            videoIdObserved: get(activeItem, 'id'),
            videoTitle: get(activeItem, 'title'),
            origin: get(activeItem, 'origin'),
            roofData: get(activeItem, 'roofData')
        });
    };

    player.on('playlistItem', handlePlaylistItem);
    player.on('time', handleTime);
    player.on('seek', handleSeek);
    player.on('complete', handleComplete);
    player.on('play', handlePlay);

    return () => {
        invokeMethod(player, 'off', 'playlistItem', handlePlaylistItem);
        invokeMethod(player, 'off', 'time', handleTime);
        invokeMethod(player, 'off', 'seek', handleSeek);
        invokeMethod(player, 'off', 'complete', handleComplete);
        invokeMethod(player, 'off', 'play', handlePlay);
    };
};
