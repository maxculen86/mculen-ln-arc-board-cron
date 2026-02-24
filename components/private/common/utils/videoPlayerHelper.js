import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';

const programmaticMutePlayers = new WeakSet();

export const markProgrammaticMute = player => {
    if (player) {
        programmaticMutePlayers.add(player);
    }
};

export const isInDatalayerEvent = (event, videoId) =>
    window &&
    window.dataLayer &&
    window.dataLayer.some(
        element => element.event === event && element.videoID === videoId
    );

export const addVideoDisplayEvent = ({ title, idVideo }) => {
    if (isInDatalayerEvent('videoDisplay', `${idVideo}`)) {
        return;
    }

    if (window && window.dataLayer) {
        window.dataLayer.push({
            event: 'videoDisplay',
            videoName: `${title}`,
            videoID: `${idVideo}`
        });
    }
};

export const updatedMediaData = (source, { title, id }) => {
    const currentItem = source?.item || source || {};

    return {
        title: currentItem.title || title,
        id: currentItem.mediaid || id
    };
};

export const pushVideoControlEvent = ({ id, title = '', action }) => {
    if (!action || !id) return;

    const payload = {
        event: 'e_videoclick',
        category: `${id}`,
        action,
        label: `${title}`
    };

    addEventToDataLayerV2(payload);
};

export const isBackwardTenSeconds = event => {
    if (!event) return false;

    const offset = event.offset ?? 0;
    const position = event.position ?? 0;
    const jump = offset - position;

    return jump <= -8 && jump >= -12;
};

export const getFullscreenAction = event =>
    event?.fullscreen ? 'fullscreen' : 'exit_fullscreen';

export const getMuteAction = event => (event?.mute ? 'mute' : 'unmute');

export const shouldTrackRelatedOpen = event => event?.method !== 'complete';

export const registerVolumeRelease = onRelease => {
    const handleRelease = () => {
        onRelease?.();
    };

    document.addEventListener('mouseup', handleRelease, { once: true });
    document.addEventListener('touchend', handleRelease, { once: true });
};

export const registerJwVideoControlsTracking = ({
    player,
    defaultTitle,
    defaultId,
    onSeek,
    onPlaylistItem
}) => {
    if (!player) return () => {};

    let currentTitle = defaultTitle;
    let currentId = defaultId;
    let volumeDragActive = false;
    let relatedPlugin;

    const updateCurrentMedia = source => {
        ({ title: currentTitle, id: currentId } = updatedMediaData(source, {
            title: currentTitle,
            id: currentId
        }));

        volumeDragActive = false;

        onPlaylistItem?.({ title: currentTitle, id: currentId });
    };

    const handleSeek = event => {
        onSeek?.(event);

        if (isBackwardTenSeconds(event)) {
            pushVideoControlEvent({
                id: currentId,
                title: currentTitle,
                action: 'delay'
            });
        }
    };

    const handleMute = event => {
        if (programmaticMutePlayers.has(player)) {
            programmaticMutePlayers.delete(player);
            return;
        }

        pushVideoControlEvent({
            id: currentId,
            title: currentTitle,
            action: getMuteAction(event)
        });
    };

    const handleVolume = () => {
        if (volumeDragActive) return;

        volumeDragActive = true;

        pushVideoControlEvent({
            id: currentId,
            title: currentTitle,
            action: 'volumen'
        });

        registerVolumeRelease(() => {
            volumeDragActive = false;
        });
    };

    const handleLevelsChanged = () => {
        pushVideoControlEvent({
            id: currentId,
            title: currentTitle,
            action: 'config'
        });
    };

    const handleFullscreen = event => {
        pushVideoControlEvent({
            id: currentId,
            title: currentTitle,
            action: getFullscreenAction(event)
        });
    };

    const handleRelatedOpen = event => {
        if (!shouldTrackRelatedOpen(event)) return;

        pushVideoControlEvent({
            id: currentId,
            title: currentTitle,
            action: 'mas_videos'
        });
    };

    const handleRelatedReady = () => {
        relatedPlugin = player.getPlugin?.('related');
        relatedPlugin?.on?.('open', handleRelatedOpen);
    };

    player.on('relatedReady', handleRelatedReady);

    updateCurrentMedia(player.getPlaylistItem?.());

    return () => {
        player.off?.('seek', handleSeek);
        player.off?.('mute', handleMute);
        player.off?.('volume', handleVolume);
        player.off?.('levelsChanged', handleLevelsChanged);
        player.off?.('fullscreen', handleFullscreen);
        player.off?.('playlistItem', updateCurrentMedia);
        player.off?.('relatedReady', handleRelatedReady);
        relatedPlugin?.off?.('open', handleRelatedOpen);
        programmaticMutePlayers.delete(player);
    };
};

export const registerVideoResumeTracking = ({
    player,
    defaultTitle,
    defaultId
}) => {
    if (!player) return () => {};

    let currentTitle = defaultTitle;
    let currentId = defaultId;
    let wasPaused = false;
    let skipPlayForSeek = false;

    const updateCurrentMedia = source => {
        ({ title: currentTitle, id: currentId } = updatedMediaData(source, {
            title: currentTitle,
            id: currentId
        }));
        wasPaused = false;
        skipPlayForSeek = false;
    };

    const handleSeek = () => {
        skipPlayForSeek = true;
    };

    const handlePlay = () => {
        if (skipPlayForSeek) {
            skipPlayForSeek = false;
            return;
        }

        if (wasPaused) {
            wasPaused = false;
            addEventToDataLayerV2({
                event: 'videoResume',
                videoName: `${currentTitle}`,
                videoID: `${currentId}`
            });
        }
    };

    const handlePause = () => {
        wasPaused = true;
    };

    player.on('seek', handleSeek);
    player.on('play', handlePlay);
    player.on('pause', handlePause);
    player.on('playlistItem', updateCurrentMedia);

    updateCurrentMedia(player.getPlaylistItem?.());

    return () => {
        player.off?.('seek', handleSeek);
        player.off?.('play', handlePlay);
        player.off?.('pause', handlePause);
        player.off?.('playlistItem', updateCurrentMedia);
    };
};
